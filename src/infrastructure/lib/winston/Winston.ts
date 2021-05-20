import * as winston from "winston";
import { transports } from "winston";

export class Winston {

  async logger() {
    winston.createLogger({
      transports: [
        new winston.transports.File({
          filename: "error.log",
          level: "error",
          format: winston.format.json()
        }),
        new winston.transports.Http({
          level: "warn",
          format: winston.format.json()
        }),
        new transports.Console({
          level: "info",
          format: winston.format.combine(winston.format.colorize(), winston.format.simple())
        })
      ],
      rejectionHandlers: [
        new transports.File({ filename: "reject.log" })
      ]
    })
  }
}