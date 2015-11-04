import sbt._
import sbt.Keys._

object LiftProjectBuild extends Build {

  import Dependencies._
  import BuildSettings._

  lazy val root = Project("Lift-3", file("."))
    .settings(liftAppSettings: _*)
    .settings(libraryDependencies ++=
      compile(
        jettyWebapp,
        liftWebkit,
        logback
      ) ++
      test(scalatest) ++
      container(jettyWebapp)
    )
}
