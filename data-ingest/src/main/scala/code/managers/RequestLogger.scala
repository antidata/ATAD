package code.managers

import com.mongodb.util.JSON
import com.mongodb.casbah._
import net.liftweb.json.JsonAST.JValue
import net.liftweb.json.JsonAST
import net.liftweb.util.Props

object RequestLogger {
  import com.mongodb.casbah.Imports._
  lazy val dbName = "cluster"
  lazy val mongoClient = MongoClient(Props.get("mongoUrl").openOr("localhost"), 27017)
  lazy val collections: scala.collection.mutable.Map[String, MongoCollection] = collection.mutable.Map()

  def init(): Unit = {
    // Connect to mongo
    mongoClient
  }

  def logRequest(id: String, jv: JValue, service: String): Unit = {
    if(!collections.contains(service)) {
      val coll = mongoClient(dbName)(service)
      collections += (service -> coll)
    }
    collections(service).insert(JSON.parse(s"""{modelId: $id, data: ${JsonAST.compactRender(jv)}""").asInstanceOf[DBObject])
  }
}
