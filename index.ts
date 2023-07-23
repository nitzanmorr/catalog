import express, { Express, Request, Response } from "express";
import { testDbConnection } from "./src/configs/db";
import products from "./src/models/models";
import router from "./src/routers/routes";
import bodyParser from "body-parser";

const sq = require("./src/configs/db");
require("dotenv").config();

const app: Express = express();
const port = process.env.APP_PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use(router);
app.use(bodyParser.urlencoded({ extended: true }));

const startApp = async () => {
  await products.sync();
};

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
  testDbConnection();
  startApp();
});
