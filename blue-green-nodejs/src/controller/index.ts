import { Request, Response } from "express";
import config from "../config";

const startTime = Date.now();
const startUsage = process.cpuUsage();

function accessLog(req: Request) {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
}

function cpuUsageCalculation(): number {
  /** CPU Usage Calc - Start */
  const endTime = Date.now();
  const endUsage = process.cpuUsage(startUsage); // Passes previous value to get diff

  const elapsedTimeMs = endTime - startTime;

  // Convert user and system microsecond times to milliseconds
  const totalUsageMs = (endUsage.user + endUsage.system) / 1000;

  // Calculate the percentage relative to the elapsed time
  const cpuPercentage = (totalUsageMs / elapsedTimeMs) * 100;
  /** CPU Usage Calc - End */
  return cpuPercentage;
}

function commonHealth(req: Request, res: Response) {
  accessLog(req);
  res.status(200).json({
    status: "success",
    success: true,
    message: "Successful response!",
    data: {},
  });
}

function commonStatus(req: Request, res: Response) {
  accessLog(req);

  const memObj = process.memoryUsage();

  res.status(200).json({
    status: "success",
    success: true,
    message: "Successful response!",
    data: {
      uptime: process.uptime(),
      cpu: cpuUsageCalculation().toFixed(2),
      memory: (memObj.heapUsed / memObj.heapTotal).toFixed(2),
      memoryObj: {
        // Total memory allocated to the process by the OS
        totalAllocatedOS: `${(memObj.rss / 1024 / 1024).toFixed(2)} MB`,

        // V8 Heap memory allocated for JS objects
        allocatedHeap: `${(memObj.heapTotal / 1024 / 1024).toFixed(2)} MB`,

        // V8 Heap memory actually being used by JS objects
        usedHeap: `${(memObj.heapUsed / 1024 / 1024).toFixed(2)} MB`,

        // Memory used by C++ bindings/buffers outside the JS heap
        external: `${(memObj.external / 1024 / 1024).toFixed(2)} MB`,
      },
      color: config.deployment,
    },
  });
}

export { commonHealth, commonStatus };
