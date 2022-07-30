
import pull_request_handler from "./pull_request"
import {Express} from "express";

const github_webhooks = {

	register_endpoints: (app: Express) => {

		console.log("registering webhook endpoints");

		app.get("/wh/github", (_req, res) => { res.send("Only POST on this EP"); });
		app.post("/wh/github", async (req, res) => {

			let event = req.headers["x-github-event"]; // ["push", "create", "pull_request", "issue_comment", "pull_request_review", ... ]
			const body = req.body;

			if(Array.isArray(event)) event = event[0];

			pull_request_handler(event, body);
			// TODO : add all other handlers here

			res.send("OK");
		});

	}
}

export default github_webhooks;
