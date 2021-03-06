import sbt._
import sbt.Keys._

object LiftProjectBuild extends Build {

  import Dependencies._
  import BuildSettings._

  lazy val root = Project("atad-http", file("."))
    .settings(liftAppSettings: _*)
    .settings(libraryDependencies ++=
      compile(
        jettyWebapp,
        liftWebkit,
        rogueField,
        rogueCore,
        rogueLift,
        rogueIndex,
        liftMongodb,
        logback,
        htmjava,
        akkaCluster,
        akkaContrib,
        moclu,
        akkaMultiNodeTestkit
      ) ++
      test(scalatest) ++
      container(jettyWebapp)
    )
}
