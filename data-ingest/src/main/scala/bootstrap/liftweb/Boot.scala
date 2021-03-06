package bootstrap.liftweb

import java.util.Date
import javax.mail.internet.MimeMessage
import code.managers.{RequestLogger, ClusterRefs}
import code.model.{RadarModel, MongoLogger}
import code.rest.ApiRest
import net.liftweb._
import common._
import http._
import net.liftweb.util.Props
import org.joda.time.DateTime
import util._
import code.config._
import akka.pattern.ask
import akka.util.Timeout
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration._
import scala.util.{Failure, Success}
import com.mongodb.{MongoClient, ServerAddress, Mongo}
import net.liftweb.mongodb.{MongoDB}


/**
 * A class that's instantiated early and run.  It allows the application
 * to modify lift's environment
 */
class Boot extends Loggable {
  implicit val timeout = Timeout(30 seconds)

  def boot {
    logger.info("Run Mode: "+Props.mode.toString)

    // where to search snippet
    LiftRules.addToPackages("code")

    // set the default htmlProperties
    LiftRules.htmlProperties.default.set((r: Req) => new Html5Properties(r.userAgent))

    // Build SiteMap
    LiftRules.setSiteMap(Site.siteMap)

    // Error handler
    ErrorHandler.init

    // 404 handler
    LiftRules.uriNotFound.prepend(NamedPF("404handler") {
      case (req, failure) =>
        NotFoundAsTemplate(ParsePath(List("404"), "html", false, false))
    })

    // Show the spinny image when an Ajax call starts
    LiftRules.ajaxStart = Full(() => LiftRules.jsArtifacts.show("ajax-spinner").cmd)

    // Make the spinny image go away when it ends
    LiftRules.ajaxEnd = Full(() => LiftRules.jsArtifacts.hide("ajax-spinner").cmd)

    // Force the request to be UTF-8
    LiftRules.early.append(_.setCharacterEncoding("UTF-8"))

    // Mailer
    Mailer.devModeSend.default.set((m: MimeMessage) => logger.info("Dev mode message:\n" + prettyPrint(m)))
    Mailer.testModeSend.default.set((m: MimeMessage) => logger.info("Test mode message:\n" + prettyPrint(m)))

    // Cluster

    LiftRules.statelessDispatch.append(ApiRest)

    // Init

    ClusterRefs.actorSystem

    // Mongo
    val server = new ServerAddress(Props.get("mongoUrl").getOrElse("127.0.0.1"), 27017)

    MongoDB.defineDb(DefaultConnectionIdentifier, new MongoClient(server), "cluster")

    MongoLogger.createRecord.time(new Date()).save(true)

    //RadarModel.initRadarModel()
  }

  private def prettyPrint(m: MimeMessage): String = {
    val stringBuilder = new StringBuilder
    val headerLines = m.getAllHeaderLines
    while (headerLines.hasMoreElements)
      stringBuilder ++= headerLines.nextElement.toString + "\n"

    val out =
      s"""
        |$stringBuilder
        |-----------------------------
        |${m.getContent}
      """.stripMargin

    out
  }
}
