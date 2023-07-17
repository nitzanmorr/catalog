import { Router } from "express";
import { Op } from "sequelize";
const router = Router();

router.get("/", async (req, res) => {
  let resolutionBestFilters = req.query.resolutionBest;
  let minZoomFilters = req.query.minZoom;
  let maxZoomFilters = req.query.maxZoom;
  let nameFilters = req.query.name;
  let typeFilters = req.query.type;

  let query: object = {};

  const eliIldis = {
    query: {
      minzoom: { gt: 3, lte: 8 },
      maxzoom: {},
    },
    polygons: {},
  };
});
