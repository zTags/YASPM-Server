import express from "express";
import { existsSync, writeFileSync, mkdirSync, readFileSync } from "fs";
import { readFile } from "fs/promises";
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
yaspm.get("/api/v1/package/meta", async (req, res) => {
    // verify integrity of request
    if (req.query.package == undefined) {
        res.status(400).send("request requires a package parameter");
        console.log(`[YASPM] malformed request from ${req.ip}`);
        return;
    }
    console.log(`[YASPM] request for package ${req.query.package}'s metadata from ${req.ip}`);
    if (req.query.package.toString().includes("..")) {
        res.status(418).send("im a teapot");
    } else {
        res.sendFile(`${__dirname}/yaspm/packages/${req.query.package}/meta.json`);
    }
});

yaspm.get("/api/v1/package/data", async (req, res) => {
    // verify integrity of request
    if (req.query.package == undefined) {
        res.status(400).send("request requires a package parameter");
        console.log(`[YASPM] malformed request from ${req.ip}`);
        return;
    }
    console.log(`[YASPM] request for package ${req.query.package}'s data from ${req.ip}`);
    
    if (req.query.package.toString().includes("..")) {
        res.status(418).send("im a teapot");
    } else {
        res.sendFile(`${__dirname}/yaspm/packages/${req.query.package}/package.tar.gz`);
    }
});

yaspm.listen(config.port, () => {
    console.log(`[YASPM] Serving at port ${config.port}`);
});