package bootstrap.liftweb

import javax.mail.internet.MimeMessage
import net.liftweb._
import common._
import http._
import net.liftweb.util.Props
import util._
import code.config._

/**
 * A class that's instantiated early and run.  It allows the application
 * to modify lift's environment
 */
class Boot extends Loggable {

  def boot {
    logger.info("Run Mode: "+Props.mode.toString)

    LiftRules.securityRules = () => {
      SecurityRules(content = Some(ContentSecurityPolicy(
        styleSources = List(
          ContentSourceRestriction.Host("http://fonts.gstatic.com"),
          ContentSourceRestriction.Host("http://mt0.googleapis.com"),
          ContentSourceRestriction.Host("http://mt1.googleapis.com"),
          ContentSourceRestriction.Host("http://maps.googleapis.com"),
          ContentSourceRestriction.Host("https://maps.googleapis.com"),
          ContentSourceRestriction.Host("https://fonts.googleapis.com"),
          ContentSourceRestriction.Host("http://fonts.googleapis.com"),
          ContentSourceRestriction.Host("http://cdnjs.cloudflare.com"),
          ContentSourceRestriction.Host("https://fonts.gstatic.com"),
          ContentSourceRestriction.Host("https://www.youtube.com"),
          ContentSourceRestriction.Host("https://fonts.gstatic.com"),
          ContentSourceRestriction.UnsafeInline,
          ContentSourceRestriction.Self
        ),
        scriptSources = List(
          ContentSourceRestriction.Host("http://fonts.gstatic.com"),
          ContentSourceRestriction.Host("http://mt0.googleapis.com"),
          ContentSourceRestriction.Host("http://mt1.googleapis.com"),
          ContentSourceRestriction.Host("http://maps.googleapis.com"),
          ContentSourceRestriction.Host("https://maps.googleapis.com"),
          ContentSourceRestriction.Host("https://fonts.googleapis.com"),
          ContentSourceRestriction.Host("http://fonts.googleapis.com"),
          ContentSourceRestriction.Host("http://cdnjs.cloudflare.com"),
          ContentSourceRestriction.Host("https://fonts.gstatic.com"),
          ContentSourceRestriction.Host("https://www.youtube.com"),
          ContentSourceRestriction.Host("https://fonts.gstatic.com"),
          ContentSourceRestriction.UnsafeInline,
          ContentSourceRestriction.UnsafeEval,
          ContentSourceRestriction.Self
        )
      )))
    }
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
