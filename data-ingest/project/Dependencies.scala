import sbt._

object Dependencies {

  val resolutionRepos = Seq(
    "Sonatype Releases" at "https://oss.sonatype.org/content/repositories/releases",
    "Sonatype Snapshots" at "https://oss.sonatype.org/content/repositories/snapshots"
  )

  def compile(deps: ModuleID*): Seq[ModuleID] = deps map (_ % "compile")

  def provided(deps: ModuleID*): Seq[ModuleID] = deps map (_ % "provided")

  def test(deps: ModuleID*): Seq[ModuleID] = deps map (_ % "test")

  def runtime(deps: ModuleID*): Seq[ModuleID] = deps map (_ % "runtime")

  def container(deps: ModuleID*): Seq[ModuleID] = deps map (_ % "container")

  object Ver {
    val lift = "3.0-M6"
    val lift_edition = "3.0"
    //    val jetty = "9.2.2.v20140723"
    val jetty = "8.1.16.v20140903"
    val akka = "2.4-M3"
  }

  // Lift + Rogue
  val liftWebkit = "net.liftweb" %% "lift-webkit" % Ver.lift
  val rogueField = "com.foursquare" %% "rogue-field" % "2.5.0" intransitive()
  val rogueCore = "com.foursquare" %% "rogue-core" % "2.5.1" intransitive()
  val rogueLift = "com.foursquare" %% "rogue-lift" % "2.5.1" intransitive()
  val rogueIndex = "com.foursquare" %% "rogue-index" % "2.5.1" intransitive()
  val liftMongodb = "net.liftweb" %% "lift-mongodb-record" % Ver.lift

  // Jetty
  val jettyWebapp = "org.eclipse.jetty" % "jetty-webapp" % Ver.jetty
  val jettyPlus = "org.eclipse.jetty" % "jetty-plus" % Ver.jetty
  val servlet = "javax.servlet" % "javax.servlet-api" % "3.0.1"

  // Misc
  val logback = "ch.qos.logback" % "logback-classic" % "1.1.2"
  val scalatest = "org.scalatest" %% "scalatest" % "2.2.1"

  // HTM + Moclu
  val htmjava = "org.numenta" % "htm.java" % "0.6.3-sSNAPSHOT"
  val moclu = "htm-model-cluster" % "htm-model-cluster_2.11" % "0.2.5"

  // Akka
  val akkaCluster = "com.typesafe.akka" %% "akka-cluster" % Ver.akka
  val akkaContrib = "com.typesafe.akka" %% "akka-contrib" % Ver.akka
  val akkaMultiNodeTestkit = "com.typesafe.akka" %% "akka-multi-node-testkit" % Ver.akka
}
