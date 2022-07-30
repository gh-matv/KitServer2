
import dbsqlite from "./db_sqlite"
import {expect} from "chai";

describe("sqlite database", () => {

	it("should open correctly", () => {
		expect(() => dbsqlite.Open()).to.not.throw();
	})

	it("should SELECT successfully", async () => {

		const x = await dbsqlite.PrepareAndQueryUnique<{result: number;}>("SELECT (1+?) as result", 10);
		expect(x.result).to.equal(11);
	})

})
