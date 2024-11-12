import { Router } from "express";
import adminAuthController from "../controller/adminAuthController";
const authRouter = Router();

authRouter.route("/login").post(adminAuthController.login);
//authRouter.route("/logout").get(adminAuthController.logout);

export default authRouter;
