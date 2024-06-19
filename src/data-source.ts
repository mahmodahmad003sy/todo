import "reflect-metadata";
import { DataSource } from "typeorm";
import { Task } from "./entity/task";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "todo",
  password: "todo",
  database: "todo",
  synchronize: true,
  logging: false,
  entities: [Task],
  migrations: [],
  subscribers: [],
});
