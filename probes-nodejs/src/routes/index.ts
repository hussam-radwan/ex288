import { Router } from "express";
import { commonHealth, commonStatus, crashController } from "../controllers";
import crashMiddleware from "../middlewares/crash.middleware";
import delayMiddleware from "../middlewares/delay.middleware";

const routes = Router();

routes.get("/startup", delayMiddleware, crashMiddleware, commonHealth);
routes.get("/readiness", delayMiddleware, crashMiddleware, commonHealth);
routes.get("/liveness", delayMiddleware, crashMiddleware, commonHealth);
routes.get("/status", delayMiddleware, crashMiddleware, commonStatus);
routes.get("/crash", crashController);

export default routes;
