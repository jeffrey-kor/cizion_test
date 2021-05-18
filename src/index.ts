import "reflect-metadata";
import { createConnection, useContainer } from "typeorm";
import { createExpressServer } from "routing-controllers";
// import { Container } from 'typedi';

// import * as cors from "cors"
// const app = express();
// app.use(cors());
// app.use(express.json());

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
    app.listen(5000, () => {
      console.log(`Server is running on ${5000}`);
    });
  })
  .catch((err) => {
  console.error(err);
});