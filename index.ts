import express, { Express, Request, Response } from "express";
import expressValidator from "express-validator";

const sq = require("./src/configs/db");
require("dotenv").config();

const app: Express = express();
const port = process.env.APP_PORT;

app.use(expressValidator());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
