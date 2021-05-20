import "reflect-metadata";
import { createExpressServer } from 'routing-controllers';
import { Container } from "typeorm-typedi-extensions"
import { createConnection, useContainer } from 'typeorm';
require("dotenv").config({ path: __dirname + "./env" })

const PORT = Number(process.env.PORT) || 5000;


useContainer(Container);

createConnection()
  .then(() => {
    const app = createExpressServer({
      cors: true,
      controllers: [__dirname + "/controller/*.ts"],
      middlewares: [__dirname + "./infrastructure/middlewares/*.ts"],
    })
    // app.use("/api-docs", SwaggerUi.serve, SwaggerUi.setup(swaggerDocs))
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((err) => {
  console.error(err);
});