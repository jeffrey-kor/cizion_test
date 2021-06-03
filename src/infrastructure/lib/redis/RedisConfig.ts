import { Service } from "typedi";
import Redis from "redis";
require("dotenv").config({ path: __dirname + "./env" })

@Service()
export class RedisConfig {
  public redisClient;
  constructor() {
    this.redisClient = new Redis({
      port: Number(process.env.REDIS_PORT),
      host: process.env.REDIS_HOST,
      family: Number(process.env.REDIS_FAMILY),
      password: process.env.REDIS_PASSWORD,
      db: Number(process.env.REDIS_DB),
      lazyConnect: true,
    });

    this.redisClient.on("Error", (error) => {
      console.error(error);
    });
  }
}

