import { Router } from "express";
import recordsRouter   from "./records.route";

const baseRouter = Router();

baseRouter.use('/records',recordsRouter)



export default baseRouter;