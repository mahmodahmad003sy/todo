import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "./entity/task";
import dotenv from "dotenv";

dotenv.config();
export const AppDataSource = new DataSource({
  type: "postgres",

  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  username: process.env.DB_USER || "todo",
  password: process.env.DB_PASSWORD || "todo",
  database: process.env.DB_NAME || "todo",
  synchronize: process.env.NODE_ENV !== "production",
  logging: false,
  entities: [Task],
  migrations: [],
  subscribers: [],
});
