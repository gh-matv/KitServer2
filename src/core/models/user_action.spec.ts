import Action from "./action";
import User from "./user";
import {setup} from "mocha";
import DbSqlite from "../databases/db_sqlite";
import {expect} from "chai";

describe("MODEL user/action", async () => {

	setup(() => {
		DbSqlite.Open();
	})

	it("should have an existing user", async () => {
		const user = await User.GetOrCreateByName("_test");

		expect(user.id).above(0);
	})

	it("should be able to add an action", async () => {
		const user = await User.GetOrCreateByName("_test");
		const action = await Action.CreateAction(0, `test_action_${user.id}`, user);

		expect(action.id).above(0);
	})

	it("should be able to get the user from the action", async () => {
		const action = await Action.GetById(1);
		const user = await action.userid();

		console.log(user);

		expect(user.id).above(0);
	})
})
