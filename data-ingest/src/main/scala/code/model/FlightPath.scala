package code.model

import net.liftweb.mongodb.record.field.{MongoCaseClassField, DateField, JObjectField, ObjectIdPk}
import net.liftweb.mongodb.record.{MongoMetaRecord, MongoRecord}
import net.liftweb.record.field.{DoubleField, StringField, DateTimeField}
import com.foursquare.rogue.Rogue._
import com.foursquare.rogue.LatLong

class FlightPath private() extends MongoRecord[FlightPath] with ObjectIdPk[FlightPath] {
  override def meta = FlightPath

  object modelId extends StringField(this, "")
  object service extends StringField(this, "")
  object time extends DateField(this)
  object timestamp extends DoubleField(this)
  object additional extends JObjectField(this)
  object speed extends DoubleField(this)
  object angle extends DoubleField(this)
  object altitude extends DoubleField(this)
  object loc extends MongoCaseClassField[FlightPath, LatLong](this)
}

object FlightPath extends FlightPath with MongoMetaRecord[FlightPath] {
  override def collectionName = "flightPaths"
  import net.liftweb.mongodb.BsonDSL._
  createIndex(service.name -> 1)
  createIndex(id.name -> 1)
  createIndex(time.name -> 1)
  createIndex(loc.name -> "2d")
}
