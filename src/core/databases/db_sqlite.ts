
import config from "../config";
import sq from "sqlite3";
const { Database } = sq.verbose();

export default class DbSqlite
{
	static db: any = null;

	static Open() {
		if(DbSqlite.db !== null) return;
		DbSqlite.db = new Database(config.database.sqlite_filename);
		console.log("[Success] Connected to sqlite database");
	}

	static Exec(req: string) {
		DbSqlite.db.serialize(() => {
			DbSqlite.db.run(req);
		})
	}

	static PrepareAndQueryRawData<T>(req: string, paramOrParams: any | any[]): Promise<T[]> {

		if(DbSqlite.db === null) DbSqlite.Open();

		const stmt = DbSqlite.db.prepare(req);

		const p = new Promise<T[]>(resolve => {
			stmt.all(paramOrParams, (err: any, row: T[]) => {
				if(err !== null) throw err;
				resolve(row);
			});
		})

		stmt.finalize();

		return p;
	}

	static async PrepareAndQueryUnique<T extends object>(req: string, paramOrParams: any | any[]): Promise<T> {
		return (await this.PrepareAndQueryRawData<T>(req, paramOrParams))[0];
	}
}

