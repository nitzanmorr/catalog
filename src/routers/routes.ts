import { Router, Request, Response } from "express";
import { Op } from "sequelize";
import express from "express";
import {
  queryValidateChain,
  newProductValidateChain,
} from "../validations/validations";
import { createProduct, getProductByQuery } from "../services/dbServices";
import bodyParser from "body-parser";
import { validationResult, Result, ValidationError } from "express-validator";

const router = Router();
router.use(bodyParser.json());

router.post(
  "/get_products",
  queryValidateChain,
  async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    console.log("Querying products");
    console.log(req.query);
    try {
      const result: Object = await getProductByQuery(req);
      res.send(result);
    } catch (error) {
      console.error(error);
    }
  }
);

router.post(
  "/create_product",
  newProductValidateChain,
  async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      console.log(req.body);
      const created = await createProduct(req.body);
      res.send(created);
      if (created instanceof Error) console.log(created);
      else console.log(`Product added to table at ${new Date().toJSON()}`);
    } catch (error) {
      console.log(error);
    }
  }
);

export default router;
