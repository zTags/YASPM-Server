import { Request, Response } from "express";

const packageMeta = async (req: Request, res: Response) => {
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
};

const packageData = (req: Request, res: Response) => {

};

export {
    packageMeta,
    packageData,
};