import "reflect-metadata";
import { createExpressServer } from 'routing-controllers';
import { Container } from "typeorm-typedi-extensions"
import { createConnection, useContainer } from 'typeorm';

useContainer(Container);

createConnection()
  .then(() => {
    const app = createExpressServer({
      cors: true,
      controllers: [__dirname + "/controller/*.ts"],
      middlewares: [__dirname + "./infrastructure/middlewares/*.ts"],
    })
    // app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(swaggerDocs))
    app.listen(parseInt(process.env.PORT), () => {
      console.log(`Server is running on ${parseInt(process.env.PORT)}`);
    });
  })
  .catch((err) => {
  console.error(err);
});