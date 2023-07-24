import { Router, Request, Response } from "express";
import { Op } from "sequelize";
import express from "express";
import {
  queryValidateChain,
  newProductValidateChain,
} from "../validations/validations";
import { createProduct, getProductByQuery } from "../services/dbServices";
import bodyParser from "body-parser";

const router = Router();
router.use(bodyParser.json());

router.post(
  "/get_products",
  queryValidateChain,
  async (req: Request, res: Response) => {
    console.log("Querying products");
    const result: Object = getProductByQuery(req);
    res.send(JSON.stringify(result));
  }
);

router.post(
  "/create_product",
  newProductValidateChain,
  async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const created = await createProduct(req.body);
      res.send(JSON.stringify(created));
      console.log(`Product added to table at ${new Date().toJSON()}`);
    } catch (error) {
      console.log(error);
    }
  }
);

export default router;
