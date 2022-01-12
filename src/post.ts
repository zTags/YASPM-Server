import { Request, Response } from "express";
import { error, info } from "./util.js";
const __dirname = process.cwd();

const createAccount = async (req: Request, res: Response, accounts: any, __dirname: string) => {
    if ((req.body.user == undefined) || (req.body.hash == undefined)) {
        error(`Malformed json input from ${req.ip}`);
        res.status(400).send("ERR 001");
        return accounts;
    }
    const user = req.body.user;
    const hash = req.body.hash;
    if (accounts[user] == undefined) {
        accounts[user] = hash;
        res.status(200).send("OK");
        info(`account ${user} made by ${req.ip}`);
        return accounts;
    } else {
        res.status(400).send("ERR 002");
        return accounts;
    }
};

export {
    createAccount
};