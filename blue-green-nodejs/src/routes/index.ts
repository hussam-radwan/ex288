import { Router } from "express";
import { commonHealth, commonStatus } from "../controller";

const route = Router();

route.get("/startup", commonHealth);

route.get("/liveness", commonHealth);

route.get("/readiness", commonHealth);

route.get("/status", commonStatus);

export default route;
