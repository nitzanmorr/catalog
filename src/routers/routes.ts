import { Router } from "express";
import { Op } from "sequelize";
import express from "express";

const router = Router();
router.use(express.json());

router.post("/", async (req, res) => {
  const body = req.body;
});
