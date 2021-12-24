import express from "express";
import { existsSync, writeFileSync, mkdirSync, readFileSync } from "fs";
import { packageData, packageMeta } from "./get"
import { createAccount } from "./post";
const __dirname = process.cwd();

// verify the runtime files exist
if (!existsSync(__dirname + "/yaspm/config.json")) {
    mkdirSync(__dirname + "/yaspm");
    mkdirSync(__dirname + "/yaspm/packages");
    mkdirSync(__dirname + "/yaspm/scopes");
    writeFileSync(__dirname + "/yaspm/config.json", `{"port": 4200}`);
}

// define contants
const yaspm = express();
const config = JSON.parse(readFileSync(__dirname + "/yaspm/config.json", {encoding: "utf8"}));

// set up routing
yaspm.get("/api/v1/package/meta", packageMeta);
yaspm.get("/api/v1/package/data", packageData);

yaspm.post("/api/v1/account/create", createAccount);

yaspm.listen(config.port, () => {
    console.log(`[YASPM] Serving at port ${config.port}`);
});