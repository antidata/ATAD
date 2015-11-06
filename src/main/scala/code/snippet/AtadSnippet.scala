package code.snippet

import code.model.{FlightData, FlightEvent}
import net.liftweb.common.Logger
import net.liftweb.http.js.JE.JsRaw
import net.liftweb.http.{RoundTripInfo, S, RoundTripHandlerFunc}
import net.liftweb.json.JsonAST.{JArray, JString, JValue}
import scala.xml.NodeSeq

class AtadSnippet extends Logger {
  def render() : NodeSeq = {
    val funcs: List[RoundTripInfo] = List("getFlightData" -> getFlightData _, "getFlights" -> getFlights _)

    for {
      session <- S.session
    } {
      S.appendGlobalJs(JsRaw(s"var pageFunctions = ${session.buildRoundtrip(funcs).toJsCmd}").cmd)
    }
    NodeSeq.Empty
  }

  def getFlightData(value : JValue, func: RoundTripHandlerFunc): Unit = {
    value \ "flight" match {
      case (JString(flight)) => func.send(FlightEvent.getFlightNumber(flight))
      case _ => func.failure("'flight' field missing")
    }
  }

  def getFlights(value : JValue, func: RoundTripHandlerFunc): Unit = {
    func.send(JArray(FlightData.findAll.map(_.asJValue)))
  }
}