
import config from "../config";
import { MongoClient } from "mongodb";

export default class DbMongo
{
	static db: MongoClient = null;

	static async Open() {
		DbMongo.db = new MongoClient(config.database.mongo.connection_string);
		await (async () => {
			await DbMongo.db.connect();
			await DbMongo.db.db(config.database.mongo.dbname).command({ping: 1});
			console.log("[Success] Connected to mongo database");
		})();
	}

}
