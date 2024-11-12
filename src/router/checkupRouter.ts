import { Router } from "express";
import apiController from "../controller/checkupController";
const checkupRouter = Router();

checkupRouter.route("/self").get(apiController.self);
checkupRouter.route("/health").get(apiController.health);

export default checkupRouter;
