import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import taskRoutes from "./routes/taskRoutes";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use("/tasks", taskRoutes);

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(error));
