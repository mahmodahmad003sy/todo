import "reflect-metadata";
import express from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import taskRoutes from "./routes/taskRoutes";
import { setupSwagger } from "./swagger";
import { errorHandler } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/logger";

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(requestLogger);
app.use("/tasks", taskRoutes);

setupSwagger(app);

app.use(errorHandler);

AppDataSource.initialize()
  .then(() => {
    console.log("Connected to the database");
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
      console.log(
        `API documentation available at http://localhost:${PORT}/api-docs`
      );
    });
  })
  .catch((error) => console.log(error));
