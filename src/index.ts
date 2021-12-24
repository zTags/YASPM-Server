import express from "express";
import { existsSync, writeFileSync, mkdirSync } from "fs";
const __dirname = process.cwd();

// verify the runtime files exist
if (!existsSync(__dirname + "/yaspm/config.json")) {
    mkdirSync("yaspm");
    writeFileSync(__dirname + "/yaspm/config.json", "{}");
}
// define contants
const yaspm = express();

// set up routing