import bodyParser from "body-parser";
import express, { Response, Request } from "express";
import { existsSync, writeFileSync, mkdirSync, readFileSync } from "fs";
import { packageData, packageMeta } from "./get.js"
import { createAccount } from "./post.js";
const __dirname = process.cwd();

// verify the runtime files exist
if (!existsSync(__dirname + "/yaspm/config.json")) {
    mkdirSync(__dirname + "/yaspm");
    mkdirSync(__dirname + "/yaspm/packages");
    mkdirSync(__dirname + "/yaspm/scopes");
    writeFileSync(__dirname + "/yaspm/config.json", `{"port": 4200}`);
}

// configure server
const yaspm = express();
const yaspm_post = express.Router();
yaspm_post.use(bodyParser.json());
yaspm.use("/", yaspm_post);
const config = JSON.parse(readFileSync(__dirname + "/yaspm/config.json", {encoding: "utf8"}));
const accounts = JSON.parse(readFileSync(__dirname + "/yaspm/accounts.json", {encoding: "utf8"}));

// set up routing
yaspm.get("/api/v1/package/meta", packageMeta);
yaspm.get("/api/v1/package/data", packageData);

yaspm_post.post("/api/v1/account/create", async (req: Request, res: Response) => {
    await createAccount(req, res, accounts);
});

yaspm.listen(config.port, () => {
    console.log(`[YASPM] Serving at port ${config.port}`);
});