package code.actor

import code.model.{EventJson, FlightEvent}
import net.liftweb.actor.LiftActor
import net.liftweb.http.RoundTripHandlerFunc
import net.liftweb.http.js.JsCmds
import net.liftweb.util._
import Helpers._
import net.liftweb.util.Schedule
import FlightEvent.event2Jvalue

trait RealTimeActor extends LiftActor {
  case class NextLocation(flightNumber: String, events: List[EventJson], func: RoundTripHandlerFunc)

  def start(flightNumber: String, func : RoundTripHandlerFunc): Unit = {
    FlightEvent.getFlightNumber(flightNumber, realtime = true).flights.headOption.map { flightEvents =>
      Schedule.schedule(this, NextLocation(flightNumber, flightEvents.path.sortBy(_.timestamp), func), 200.millis)
    }
  }

  override def messageHandler = {
    case NextLocation(modelId, list, func) =>
      list match {
        case h::t =>
          // TODO Get new data if t is Nil
          Schedule.schedule(this, NextLocation(modelId, t, func), 3 seconds)
          func.send(h) // using implicit def
        case _ =>
          func.send(JsCmds.Alert("End of Flight!"))
      }
    }
}