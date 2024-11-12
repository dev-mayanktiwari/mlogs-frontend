/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import os from "os";
import jwt, { SignOptions } from "jsonwebtoken";
import { AppConfig } from "../config";

export default {
  getSystemHealth: () => {
    return {
      cpuUsage: os.loadavg(),
      totalMemory: `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
      freeMemory: `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`
    };
  },
  getApplicationHealth: () => {
    return {
      environment: AppConfig.get("ENV"),
      uptime: `${process.uptime().toFixed(2)} seconds`,
      memoryUsage: {
        totalHeap: `${(process.memoryUsage().heapTotal / 1024 / 1024).toFixed(2)} MB`,
        usedHeap: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`
      }
    };
  },
  generateToken: (payload: object, secret: string, expiry: string) => {
    const options: SignOptions = { expiresIn: expiry };
    const loginToken = jwt.sign(payload, secret, options);
    return loginToken;
  }
};

