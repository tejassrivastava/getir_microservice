import { Request, Response, Router } from "express";
import logger from "../../logger/logger";
import recordsSchema from "../models/records.model";
import recordsController from "../controllers/records.controller";
import dayjs from "dayjs";
import formatParser from "dayjs/plugin/customParseFormat";
dayjs.extend(formatParser);
const recordsRouter = Router();


recordsRouter.post("/all", recordsController.getRecords);

export default recordsRouter;
