import { Request, Response } from "express";

const createAccount = async (req: Request, res: Response, accounts: any) => {
    if ((req.body.user == undefined) || (req.body.hash == undefined)) {
        console.log(`[YASPM] Malformed json input from ${req.ip}`);
        res.status(400).send("malformed json");
        return;
    }
    const user = req.body.user;
    const hash = req.body.hash;
    if (accounts[user] == undefined) {
        console.log("username was free");
    } else {
        console.log("username was taken");
    }
};

export {
    createAccount
};