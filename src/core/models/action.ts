import User from "./user";
import Db_sqlite from "../databases/db_sqlite";

class Action {

	id: number;
	descr: string;
	ref: number;
	uid: number;

	public async userid(): Promise<User> {
		return await User.GetById(this.uid);
	}

	static async CreateAction(ref: number, name: string, user: User) {

		let id;

		await Db_sqlite.PrepareAndQueryRawData("insert or ignore into action(descr, ref, uid) values(?,?,?)", [name, ref, user.id]);
		await Db_sqlite.PrepareAndQueryRawData("select max(id) as id from action where uid=?", user.id).then((val: any[]) => { id = val[0]?.id; })

		const action = new Action();
		action.id = id;

		return action;

	}

	static async GetById(uid: number): Promise<Action> {
		return Object.assign(new Action(), await Db_sqlite.PrepareAndQueryUnique<Action>("select * from action where id = ? limit 1", uid));
	}

}

export default Action;
