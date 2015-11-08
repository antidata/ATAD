package code.model

import net.liftweb.mongodb.record.field.{MongoCaseClassField, DateField, JObjectField, ObjectIdPk}
import net.liftweb.mongodb.record.{MongoMetaRecord, MongoRecord}
import net.liftweb.record.field.{BooleanField, DoubleField, StringField, DateTimeField}
import com.foursquare.rogue.Rogue._
import com.foursquare.rogue.LatLong

class FlightEvent private() extends MongoRecord[FlightEvent] with ObjectIdPk[FlightEvent] {
  override def meta = FlightEvent

  object modelId extends StringField(this, "")
  object time extends DateField(this)
  object timestamp extends DoubleField(this)
  object anomalyScore extends DoubleField(this)
  object flightData extends JObjectField(this)
  object loc extends MongoCaseClassField[FlightEvent, LatLong](this)
  object realTime extends BooleanField(this)
}

object FlightEvent extends FlightEvent with MongoMetaRecord[FlightEvent] {
  override def collectionName = "flightEvents"
  import net.liftweb.mongodb.BsonDSL._
  createIndex(id.name -> 1)
  createIndex(time.name -> 1)
  createIndex(loc.name -> "2d")
}

