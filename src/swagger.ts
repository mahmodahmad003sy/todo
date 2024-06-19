import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import path from "path";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Todo API",
    version: "1.0.0",
    description: "API for managing tasks in a todo application",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [path.resolve(__dirname, "./routes/*.ts")],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
