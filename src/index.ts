import "reflect-metadata";
import { createConnection, useContainer } from "typeorm";
import { createExpressServer } from "routing-controllers";
// import { Container } from 'typedi';
import SwaggerJsDoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Cizion backend Comment development API",
      description: "cizion api information",
      contact: {
        name: "jeffrey"
      },
      servers: ["http:localhost:5000"]
    }
  },
  apis: ["index.ts"]
}

const swaggerDocs = SwaggerJsDoc(swaggerOptions);

// useContainer(Container);

createConnection()
  .then(() => {
    const app = createExpressServer({
      cors: true,
      // controllers: [UserController]
      controllers: [__dirname + "/controller/*.ts"],
      // middlewares: [__dirname + "./infrastructure/middlewares/*.ts"],
      // interceptors: [__dirname + "./infrastructure/interceptors/*.ts"],
    })
    app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(swaggerDocs))
    app.listen(5000, () => {
      console.log(`Server is running on ${5000}`);
    });
  })
  .catch((err) => {
  console.error(err);
});