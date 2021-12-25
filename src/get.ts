import { Request, Response } from "express";
import { error, info } from "./util.js";
const __dirname = process.cwd();

const packageMeta = async (req: Request, res: Response) => {
    // verify integrity of request
    if (req.query.package == undefined) {
        res.status(400).send("request requires a package parameter");
        error(`[YASPM] malformed request from ${req.ip}`);
        return;
    }

    info(`[YASPM] request for package ${req.query.package}'s metadata from ${req.ip}`);
    
    if (req.query.package.toString().includes("..")) {
        res.status(418).send("I'm a teapot");
    } else {
        res.sendFile(`${__dirname}/yaspm/packages/${req.query.package}/meta.json`);
    }
};

const packageData = (req: Request, res: Response) => {
    // verify integrity of request
    if (req.query.package == undefined) {
        res.status(400).send("request requires a package parameter");
        error(`[YASPM] malformed request from ${req.ip}`);
        return;
    }
    info(`[YASPM] request for package ${req.query.package}'s data from ${req.ip}`);
    
    if (req.query.package.toString().includes("..")) {
        res.status(418).send("im a teapot");
    } else {
        res.sendFile(`${__dirname}/yaspm/packages/${req.query.package}/package.tar.gz`);
    }
};

const about = async (req: Request, res: Response) => {
    res.send({
        api_version: 1
    });
}

export {
    packageMeta,
    packageData,
    about,
};