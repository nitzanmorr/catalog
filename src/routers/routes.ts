import { Router, Request, Response } from "express";
import { Op } from "sequelize";
import express from "express";
import { queryValidateChain } from "../validations/validations";

const router = Router();
router.use(express.json());

router.post("/", queryValidateChain, async (req: Request, res: Response) => {});
