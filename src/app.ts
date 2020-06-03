import * as express from "express";
import { Request, Response } from "express";
import * as bodyParser from "body-parser";
import { createConnection } from "typeorm";
import { User } from "./entities/User";
import setUserRoutes from "./routes/setUsersRoutes";
import setPPPerformanceRoutes from "./routes/setPPPerformanceRoutes";
import setFeedbackRoutes from "./routes/setFeedbackRoutes";

// create typeorm connection
createConnection().then(connection => {
  const port = 3080;

  // create and setup express app
  const app = express();
  app.use(bodyParser.json());

  // register routes
  setUserRoutes(app, connection);
  setPPPerformanceRoutes(app, connection);
  setFeedbackRoutes(app, connection);

  // start express server
  console.log(`Listening to ${port}`);
  app.listen(port);
});
