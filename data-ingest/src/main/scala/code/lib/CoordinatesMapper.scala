package code.lib

import com.github.antidata.managers.AppConfiguration

object CoordinatesMapper {
  // Loading config
  lazy val latLimits = AppConfiguration.values.getDouble("atad.minLat") -> AppConfiguration.values.getDouble("atad.maxLat")
  lazy val longLimits = AppConfiguration.values.getDouble("atad.minLong") -> AppConfiguration.values.getDouble("atad.maxLong")
  lazy val latPartitions = AppConfiguration.values.getDouble("atad.latPartitions")
  lazy val longPartitions = AppConfiguration.values.getDouble("atad.longPartitions")

  // Computed variables
  lazy val latDivision = ((latLimits._1 - latLimits._2) / latPartitions).abs
  lazy val longDivision = ((longLimits._1 - longLimits._2) / longPartitions).abs

  def getPartition(lat: Double, long: Double): Option[String] = {
    if(lat >= latLimits._1 && lat <= latLimits._2 && long >= longLimits._1 && long <= longLimits._2) {
      Some(
        "%.0f".format(((lat - latLimits._1) / latDivision) + ((long - longLimits._1) / longDivision))
      )
    } else None
  }

}
