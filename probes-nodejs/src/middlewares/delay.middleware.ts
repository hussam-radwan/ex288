import { Request, Response, NextFunction } from "express";
import config from "../config";

const delayMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const responseDelay = config.RESPONSE_DELAY.toString().match(/\d+/g);
  if (responseDelay && responseDelay.length > 0) {
    const delay = parseInt(responseDelay[0]);

    setTimeout(() => next(), delay);
  } else {
    next();
  }
};

export default delayMiddleware;
