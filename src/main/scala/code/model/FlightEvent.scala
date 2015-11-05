package code.model

import net.liftweb.json.{CustomSerializer, DefaultFormats, Extraction}
import net.liftweb.json.JsonAST.{JNull, JInt, JString, JValue}
import net.liftweb.mongodb.record.field.{MongoCaseClassField, DateField, JObjectField, ObjectIdPk}
import net.liftweb.mongodb.record.{MongoMetaRecord, MongoRecord}
import net.liftweb.record.field.{DoubleField, StringField, DateTimeField}
import com.foursquare.rogue.LiftRogue._
import com.foursquare.rogue.LatLong

class FlightEvent private() extends MongoRecord[FlightEvent] with ObjectIdPk[FlightEvent] {
  override def meta = FlightEvent

  object modelId extends StringField(this, "")
  object time extends DateField(this)
  object timestamp extends DoubleField(this)
  object anomalyScore extends DoubleField(this)
  object flightData extends JObjectField(this)
  object loc extends MongoCaseClassField[FlightEvent, LatLong](this)
}

object FlightEvent extends FlightEvent with MongoMetaRecord[FlightEvent] {
  override def collectionName = "flightEvents"
  import net.liftweb.mongodb.BsonDSL._
  createIndex(id.name -> 1)
  createIndex(time.name -> 1)
  createIndex(loc.name -> "2d")
  override implicit val formats = DefaultFormats + DoubleSerializer
  case class FoldRightHelp(flights: Map[String, List[EventJson]], id: Int, lastTimestamp: Double)

  def getFlightNumber(flight: String): JValue = {
    val events = this.where(_.modelId eqs flight).fetch() map { event =>
      EventJson(event.timestamp.get, event.modelId.get, event.anomalyScore.get, event.loc.get.lat, event.loc.get.long)
    }
    Extraction.decompose(
      Flights(
        events.foldLeft(FoldRightHelp(Map[String, List[EventJson]](), 0, 0D))((helper, event) => {
          if((event.timestamp - helper.lastTimestamp).abs > 14400000D) { // 4 hrs
            // New flight
            FoldRightHelp(
              helper.flights + (s"${helper.id + 1}" -> List(event)),
              helper.id + 1,
              event.timestamp)
          } else {
            FoldRightHelp(
              helper.flights.updated(helper.id.toString, event :: helper.flights(helper.id.toString)),
              helper.id,
              event.timestamp)
          }
        }).flights.map(fidEvents => FlightEvents(fidEvents._1, fidEvents._2)).toList
      )
    )
  }
}

case class Flights(flights: List[FlightEvents])

case class FlightEvents(flightID: String, path: List[EventJson])

case class EventJson(
  timestamp: Double,
  modelId: String,
  anomalyScore: Double,
  latitude: Double,
  longitude: Double
)

case object DoubleSerializer extends CustomSerializer[Double](format => (
  {
    case JString(s) => s.toDouble
    case JInt(n) => n.toDouble
  },
  {
    case d: Double => JString(f"$d%15.4f")
  }
))