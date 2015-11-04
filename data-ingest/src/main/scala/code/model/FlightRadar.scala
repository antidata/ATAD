package code.model

import net.liftweb.mongodb.record.field.{MongoCaseClassField, DateField, JObjectField, ObjectIdPk}
import net.liftweb.mongodb.record.{MongoMetaRecord, MongoRecord}
import net.liftweb.record.field.{DoubleField, StringField, DateTimeField}
import com.foursquare.rogue.Rogue._
import com.foursquare.rogue.LatLong

class FlightRadar private() extends MongoRecord[FlightRadar] with ObjectIdPk[FlightRadar] {
  override def meta = FlightRadar

  object modelId extends StringField(this, "")
  object service extends StringField(this, "")
  object time extends DateField(this)
  object timestamp extends DoubleField(this)
  object additional extends JObjectField(this)
  object speed extends DoubleField(this)
  object angle extends DoubleField(this)
  object altitude extends DoubleField(this)
  object loc extends MongoCaseClassField[FlightRadar, LatLong](this)
}

object FlightRadar extends FlightRadar with MongoMetaRecord[FlightRadar] {
  override def collectionName = "FlightRadars"
  import net.liftweb.mongodb.BsonDSL._
  createIndex(service.name -> 1)
  createIndex(id.name -> 1)
  createIndex(time.name -> 1)
  createIndex(loc.name -> "2d")
}
