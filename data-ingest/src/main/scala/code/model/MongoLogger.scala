package code.model

import net.liftweb.mongodb.record.field.{DateField, JObjectField, ObjectIdPk}
import net.liftweb.mongodb.record.{MongoMetaRecord, MongoRecord}
import net.liftweb.record.field.{StringField, DateTimeField}

class MongoLogger private () extends MongoRecord[MongoLogger] with ObjectIdPk[MongoLogger] {
  override def meta = MongoLogger

  object objectId extends StringField(this, "")
  object service extends StringField(this, "")
  object time extends DateField(this)
  object additional extends JObjectField(this)
}

object MongoLogger extends MongoLogger with MongoMetaRecord[MongoLogger] {
  override def collectionName = "Logs"
  import net.liftweb.mongodb.BsonDSL._
  createIndex(service.name -> 1)
  createIndex(objectId.name -> 1)
  createIndex(time.name -> 1)
}
