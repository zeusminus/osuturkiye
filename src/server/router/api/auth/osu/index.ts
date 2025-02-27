import promiseRouter from "express-promise-router";
import passport from "passport";
import { ErrorCode } from "../../../../models/ErrorCodes.js";
import { isDatabaseAvailable } from "../../../../middlewares.js";

export class OsuAuthRouter {
    public readonly router = promiseRouter();

    constructor() {
        this.router.get("/", isDatabaseAvailable, passport.authenticate("osu", { scope: ["identify"] }));

        this.router.get("/callback", isDatabaseAvailable, passport.authenticate("osu", { failureRedirect: "/" }) , (req, res) => {
            if (!req.query.code || req.query.error)
                throw ErrorCode.MISSING_PARAMETERS;
                
            res.redirect("/");
        });
    }
}