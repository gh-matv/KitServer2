
import dbmongo from "./db_mongo"
import {expect} from "chai";

describe("mongo database", () => {

	it("should open correctly", () => {
		expect(() => dbmongo.Open()).to.not.throw();
	})
})
