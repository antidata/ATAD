package code.actor

import code.model.{EventJson, FlightEvent}
import net.liftweb.actor.LiftActor
import net.liftweb.http.RoundTripHandlerFunc
import net.liftweb.http.js.JsCmds
import net.liftweb.util._
import Helpers._
import net.liftweb.util.Schedule
import FlightEvent._

trait RealTimeActor extends LiftActor {
  lazy val topCount = 50

  case class StartRealTime(nextLoc: NextLocation)
  case class NextLocation(flightNumber: String, events: List[EventJson], func: RoundTripHandlerFunc, lastTimestamp: Double = 0D)

  def start(flightNumber: String, func : RoundTripHandlerFunc): Unit = {
    FlightEvent.getFlightNumber(flightNumber, realtime = true).flights.headOption.map { flightEvents =>
      Schedule.schedule(this, StartRealTime(NextLocation(flightNumber, flightEvents.path.sortBy(_.timestamp), func)), TimeSpan(200))
    }
  }

  override def messageHandler = {
    case StartRealTime(data) =>
      val top = data.events.take(topCount)
      Schedule.schedule(this, NextLocation(data.flightNumber, data.events.drop(topCount), data.func, top.last.timestamp), TimeSpan(3000))
      data.func.send(top) // using implicit def

    case NextLocation(modelId, list, func, lastTime) =>
      list match {
        case h::t =>
          // TODO Get new data if t is Nil
          Schedule.schedule(this, NextLocation(modelId, t, func, h.timestamp), TimeSpan(3000))
          func.send(h) // using implicit def
        case _ =>
          func.send(JsCmds.Alert("End of Flight!"))
      }
    }
}