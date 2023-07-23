import { Router, Request, Response } from "express";
import { Op } from "sequelize";
import express from "express";
import {
  queryValidateChain,
  newProductValidateChain,
} from "../validations/validations";
import { createProduct } from "../services/dbServices";

const router = Router();
router.use(express.json());

router.post(
  "/get_product",
  queryValidateChain,
  async (req: Request, res: Response) => {}
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
