import sbt._
import sbt.Keys._

object LiftProjectBuild extends Build {

  import Dependencies._
  import BuildSettings._

  lazy val root = Project("atad-client", file("."))
    .settings(liftAppSettings: _*)
    .settings(libraryDependencies ++=
      compile(
        jettyWebapp,
        liftWebkit,
        logback,
        mongoDb,
        rogueField,
        rogueCore,
        rogueLift,
        rogueIndex,
        liftMongodb
      ) ++
      test(scalatest) ++
      container(jettyWebapp)
    )
}
