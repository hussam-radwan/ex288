import { Request, Response, NextFunction } from "express";

const crashMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.app.get("crash")) {
    res.status(500).json({
      status: "Failed",
      success: false,
      message: "Crash Middleware!",
      data: {},
    });
    return;
  }
  next();
};

export default crashMiddleware;
