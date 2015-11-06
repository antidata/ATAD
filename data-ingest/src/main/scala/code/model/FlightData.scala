package code.model

import net.liftweb.mongodb.record.field.{MongoCaseClassField, DateField, JObjectField, ObjectIdPk}
import net.liftweb.mongodb.record.{MongoMetaRecord, MongoRecord}
import net.liftweb.record.field.{DoubleField, StringField, DateTimeField}
import com.foursquare.rogue.LiftRogue._
import com.foursquare.rogue.LatLong

class FlightData private() extends MongoRecord[FlightData] with ObjectIdPk[FlightData] {
  override def meta = FlightData

  object modelId extends StringField(this, "")
  object flightData extends JObjectField(this)
}

object FlightData extends FlightData with MongoMetaRecord[FlightData] {
  override def collectionName = "flightData"
  import net.liftweb.mongodb.BsonDSL._
  createIndex(modelId.name -> 1)
}
