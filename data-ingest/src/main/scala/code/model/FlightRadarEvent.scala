package code.model

import net.liftweb.mongodb.record.field.{MongoCaseClassField, DateField, JObjectField, ObjectIdPk}
import net.liftweb.mongodb.record.{MongoMetaRecord, MongoRecord}
import net.liftweb.record.field.{DoubleField, StringField, DateTimeField}
import com.foursquare.rogue.Rogue._
import com.foursquare.rogue.LatLong

class FlightRadarEvent private() extends MongoRecord[FlightRadarEvent] with ObjectIdPk[FlightRadarEvent] {
  override def meta = FlightRadarEvent

  object modelId extends StringField(this, "")
  object time extends DateField(this)
  object timestamp extends DoubleField(this)
  object anomalyScore extends DoubleField(this)
  object flightData extends JObjectField(this)
  object loc extends MongoCaseClassField[FlightRadarEvent, LatLong](this)
}

object FlightRadarEvent extends FlightRadarEvent with MongoMetaRecord[FlightRadarEvent] {
  override def collectionName = "flightRadarEvents"
  import net.liftweb.mongodb.BsonDSL._
  createIndex(id.name -> 1)
  createIndex(time.name -> 1)
  createIndex(loc.name -> "2d")
}

