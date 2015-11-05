package code.model

import code.managers.ClusterRefs
import com.github.antidata.actors.HtmModelActor.CreateHtmModel
import com.github.antidata.managers.AppConfiguration
import net.liftweb.common.Box
import net.liftweb.mongodb.record.field.{MongoCaseClassField, DateField, JObjectField, ObjectIdPk}
import net.liftweb.mongodb.record.{MongoMetaRecord, MongoRecord}
import net.liftweb.record.field.{DoubleField, StringField, DateTimeField}
import com.foursquare.rogue.Rogue._
import com.foursquare.rogue.LatLong

class RadarModel private() extends MongoRecord[RadarModel] with ObjectIdPk[RadarModel] {
  override def meta = RadarModel

  object modelId extends StringField(this, "")
}

object RadarModel extends RadarModel with MongoMetaRecord[RadarModel] {
  override def collectionName = "RadarModels"
  import net.liftweb.mongodb.BsonDSL._
  createIndex(id.name -> 1)
  createIndex(modelId.name -> 1, unique = true)

  lazy val runInit = AppConfiguration.values.getString("atad.radarInit").toBoolean
  lazy val modelCount = AppConfiguration.values.getString("atad.radarCount").toInt

  def findModel(id: String): Box[RadarModel] = {
    find(modelId.name -> id)
  }

  def existsModel(id: String): Boolean = findModel(id).isDefined

  def initRadarModel(): Unit = {
    require(modelCount > 0)
    this.findAll.foreach(_.delete_!)
    for(mid <- 0 to modelCount) yield {
      createRecord.modelId(mid.toString).save(safe = true)
      ClusterRefs.actorSystem ! CreateHtmModel(mid.toString)
      Thread.sleep(15000L)
    }
  }
}
