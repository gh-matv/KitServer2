import Db_sqlite from "../databases/db_sqlite";

class User {

	public id: number = 0;
	public username: string = "username_not_set";

	constructor(uid: number=0, username="") {
		this.id = uid;
		this.username = username;
	}

	static async GetOrCreateByName(username: string): Promise<User> {
		let db_userid = 0;

		Db_sqlite.PrepareAndQueryRawData<User>('select id from "user" where username = ?', username).then((val: any[]) => {
            db_userid = val[0]?.id;
        });

		if(db_userid == null || db_userid === 0) {
			await Db_sqlite.PrepareAndQueryRawData<User>("insert or ignore into user(username) values(?)", username);
			await Db_sqlite.PrepareAndQueryUnique<User>("select id from user where username = ?", username).then(val => { db_userid = val?.id; })
		}

		if(db_userid === 0) throw {message:"Unable to insert the user in the db"};

		return new User(db_userid, username);
	};

	static async GetById(uid: number): Promise<User> {
		return Object.assign(new User(), await Db_sqlite.PrepareAndQueryUnique<User>("select * from user where id = ?", uid));
	}

}

export default User;
