package code.rest

import java.util.Date
import code.lib.CoordinatesMapper
import code.managers.{RequestLogger, ClusterRefs}
import code.model.{FlightData, FlightRadarEvent, FlightEvent, RadarModel}
import com.foursquare.rogue.LatLong
import com.github.antidata.actors.HtmModelActor._
import net.liftweb.http.{LiftResponse, JsonResponse, S}
import net.liftweb.http.provider.HTTPCookie
import net.liftweb.http.rest.{RestContinuation, RestHelper}
import akka.pattern.ask
import akka.util.Timeout
import net.liftweb.util.Schedule
import scala.concurrent.{Promise, Await}
import scala.concurrent.ExecutionContext.Implicits.global
import net.liftweb.json.JsonAST.{JString, JDouble, JArray}
import net.liftweb.json.JsonDSL._

object ApiRest extends RestHelper {
  implicit val timeout = akka.util.Timeout(10L, java.util.concurrent.TimeUnit.SECONDS)
  lazy val clusterTimeout = net.liftweb.util.Helpers.TimeSpan(60000L)
  serve {
    case "create" :: id :: _ JsonPost json -> _ =>
      // TODO send max and min parameters
      val (min, max): (Option[Double], Option[Double]) = (json \ "min", json \ "max") match {
        case (JDouble(min), JDouble(max)) => Some(min) -> Some(max)
        case (_, JDouble(max)) => None -> Some(max)
        case (JDouble(max), _) => Some(max) -> None
        case _ => None -> None
      }
      //RequestLogger.logRequest(id, json, "create")
      val response: Promise[LiftResponse] = Promise()
      val responseFut = response.future

      RestContinuation.async(f => {
        val fut = (ClusterRefs.actorSystem ? CreateHtmModel(id)).mapTo[ClusterEvent]
        fut.onSuccess {
          case CreateModelOk(idM) =>
            f(
              JsonResponse(
                ("status" -> 200) ~ ("msg" -> s"Htm Model $idM created")
              )
            )
          case CreateModelFail(idM) =>
            f(
              JsonResponse(
                ("status" -> 302) ~ ("msg" -> s"Htm Model $idM exists")
              )
            )
          case _ =>
            f(
              JsonResponse(
                ("status" -> 302) ~ ("msg" -> s"Unexpected message from the System")
              )
            )
        }
        Schedule.schedule(() => {
          f(
            JsonResponse(
              ("status" -> 302) ~ ("msg" -> s"Cluster timeout")
            )
          )
        }, clusterTimeout)
      })

    case "event" :: id :: _ JsonPost json -> _ =>
      val params: Option[(String, String)] =
        (json \ "value", json \ "timestamp") match {
          case (JString(valueJ), JString(timestampJ)) => Some(valueJ -> timestampJ)
          case _ => None
        }

      if(params.isEmpty)
        JsonResponse(
          ("status" -> 302) ~ ("msg" -> s"Invalid request, expected {value:'12', timestamp:'string'}")
        ) else {
        val (value, time): (String, String) = params.get
        RestContinuation.async(f => {
          val fut = (ClusterRefs.actorSystem ? HtmModelEvent(id, HtmModelEventData(id, value, time))).mapTo[ClusterEvent]
          fut.onSuccess {
            case ModelPrediction(htmModelId, anomalyScore, prediction) =>
              val latLongSpeed = value.split(";")
              FlightEvent.createRecord
                .modelId(id)
                .anomalyScore(anomalyScore)
                .timestamp(time.toLong * 1000)
                .time(new Date)
                .loc(LatLong(latLongSpeed(0).toDouble, latLongSpeed(1).toDouble))
                .save(safe = true)

              f(
                JsonResponse(
                  ("status" -> 200) ~ ("msg" -> s"Applied event Htm Model $htmModelId") ~ ("data" -> (("id" -> htmModelId) ~ ("anomalyScore" -> anomalyScore) ~ ("prediction" -> prediction.toString)))
                )
              )
            case _ =>
              f(
                JsonResponse(
                  ("status" -> 302) ~ ("msg" -> s"Unexpected message from the System")
                )
              )
          }
          Schedule.schedule(() => {
            f(
              JsonResponse(
                ("status" -> 302) ~ ("msg" -> s"Cluster timeout")
              )
            )
          }, clusterTimeout)
        })
      }

    case "bulkEvent" :: id :: _ JsonPost json -> _ =>
      val params: Option[(String, String)] =
        (json \ "value", json \ "timestamp") match {
          case (JString(valueJ), JString(timestampJ)) => Some(valueJ -> timestampJ)
          case _ => None
        }

      if(params.isEmpty)
        JsonResponse(
          ("status" -> 302) ~ ("msg" -> s"Invalid request, expected {value:'12', timestamp:'string'}")
        ) else {
        val (value, time): (String, String) = params.get
        ClusterRefs.actorSystem ! BulkHtmModelEvent(id, HtmModelEventData(id, value, time))
        JsonResponse(
          ("status" -> 200) ~ ("msg" -> s"ok")
        )
      }

    case "getData" :: id :: _ JsonPost json -> _ =>

      val response: Promise[LiftResponse] = Promise()
      val responseFut = response.future

      RestContinuation.async(f => {
        val fut = (ClusterRefs.actorSystem ? HtmEventGetModel(id)).mapTo[ClusterEvent]
        fut.onSuccess {
          case GetModelData(id, data) =>
            f(
              JsonResponse(
                ("status" -> 200) ~ ("data" -> JArray(data.map { item =>
                  ("value" -> item.value) ~ ("timestamp" -> item.timestamp) ~ ("anomalyScore" -> item.anomalyScore.getOrElse(-1D))
                })))
              )
          case ModelNotFound(idM) =>
            f(
              JsonResponse(
                ("status" -> 302) ~ ("msg" -> s"Htm Model $idM exists")
              )
            )
          case _ =>
            f(
              JsonResponse(
                ("status" -> 302) ~ ("msg" -> s"Unexpected message from the System")
              )
            )
        }
        Schedule.schedule(() => {
          f(
            JsonResponse(
              ("status" -> 302) ~ ("msg" -> s"Cluster timeout")
            )
          )
        }, clusterTimeout)
      })

    case "reset" :: id :: _ JsonPost json -> _ =>
      ClusterRefs.actorSystem ! ResetNetwork(id)
      JsonResponse(("status" -> 200) ~ ("msg"-> s"Reset to $id sent"))

    case "radar-create" :: _ JsonPost json -> _ =>
      val params: Option[(Double, Double)] =
        (json \ "lat", json \ "long") match {
          case (JDouble(lat), JDouble(long)) => Some(lat -> long)
          case _ => None
        }

      if(params.isEmpty)
        JsonResponse(
          ("status" -> 302) ~ ("msg" -> s"""Invalid request, expected {lat: x, long: y}""")
      ) else {
        val response: Promise[LiftResponse] = Promise()
        val responseFut = response.future

        val (gLat, gLong): (Double, Double) = params.get
        RestContinuation.async(f => {

        // Get the model id using coordinates:
        CoordinatesMapper.getPartition(gLat, gLong).map(modelId => {
          // Check for existence
          println(s"Verifying Model $modelId")
          if(!RadarModel.existsModel(modelId)) {
             val fut = (ClusterRefs.actorSystem ? CreateHtmModel(modelId)).mapTo[ClusterEvent]
              fut.onSuccess {
                case CreateModelOk(idM) =>
                  RadarModel.createRecord.modelId(idM).save(safe = true)
                  f(
                    JsonResponse(
                      ("status" -> 200) ~ ("msg" -> s"Htm Model $idM created")
                    )
                  )
                case CreateModelFail(idM) =>
                  f(
                    JsonResponse(
                      ("status" -> 302) ~ ("msg" -> s"Htm Model $idM exists")
                    )
                  )
                case _ =>
                  f(
                    JsonResponse(
                      ("status" -> 302) ~ ("msg" -> s"Unexpected message from the System")
                    )
                  )
              }
            } else f(JsonResponse(("status" -> 302) ~ ("msg" -> s"Model already exists")))
          }).getOrElse(f(JsonResponse(("status" -> 302) ~ ("msg" -> s"Coordinates are outside expected area"))))
          Schedule.schedule(() => {
            f(
              JsonResponse(
                ("status" -> 302) ~ ("msg" -> s"Cluster timeout")
              )
            )
          }, clusterTimeout)
        })
      }

    case "radar-event" :: _ JsonPost json -> _ =>
      val params: Option[(String, String, Double, Double)] =
        (json \ "value", json \ "timestamp", json \ "lat", json \ "long") match {
          case (JString(valueJ), JString(timestampJ), JDouble(lat), JDouble(long)) => Some((valueJ, timestampJ, lat, long))
          case _ => None
        }

      if(params.isEmpty)
        JsonResponse(
          ("status" -> 302) ~ ("msg" -> s"""Invalid request, expected {"value":"37.6068;-122.3694;100","rotation":"85","timestamp":"1446185562"}""")
        ) else {
        val (value, time, gLat, gLong): (String, String, Double, Double) = params.get
        // Get the model id using coordinates:
        CoordinatesMapper.getPartition(gLat, gLong).map(modelId => {
          RestContinuation.async(f => {
            val fut = (ClusterRefs.actorSystem ? HtmModelEvent(modelId, HtmModelEventData(modelId, value, time))).mapTo[ClusterEvent]
            fut.onSuccess {
              case ModelPrediction(htmModelId, anomalyScore, prediction) =>
                FlightRadarEvent.createRecord
                  .modelId(modelId)
                  .anomalyScore(anomalyScore)
                  .timestamp(time.toLong * 1000)
                  .time(new Date)
                  .loc(LatLong(gLat, gLong))
                  .save(safe = true)

                f(
                  JsonResponse(
                    ("status" -> 200) ~ ("msg" -> s"Applied event Htm Model $htmModelId") ~
                      ("data" -> (("id" -> htmModelId) ~ ("anomalyScore" -> anomalyScore) ~ ("prediction" -> prediction.toString)))
                  )
                )
              case _ =>
                f(
                  JsonResponse(
                    ("status" -> 302) ~ ("msg" -> s"Unexpected message from the System")
                  )
                )
            }
            Schedule.schedule(() => {
              f(
                JsonResponse(
                  ("status" -> 302) ~ ("msg" -> s"Cluster timeout")
                )
              )
            }, clusterTimeout)
          })
        }).getOrElse(JsonResponse(("status" -> 302) ~ ("msg" -> s"Coordinates are outside expected area")))
      }

    case "flight-info" :: id :: _ JsonPost json -> _ =>
      import com.foursquare.rogue.LiftRogue._
      import net.liftweb.mongodb.BsonDSL._
      if(FlightData.where(_.modelId eqs id).fetch().isEmpty) {
        FlightData.createRecord.modelId(id).flightData("data" -> json).save(safe = true)
        ("status" -> 200) ~ ("msg" -> s"Flight Number $id has been created")
      } else
        ("status" -> 302) ~ ("msg" -> s"Flight Number $id already exists")

    case e =>
      JsonResponse(("status" -> 404) ~ ("msg"-> "unknown url"))
  }
}
