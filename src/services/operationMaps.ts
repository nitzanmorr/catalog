import { Op } from "sequelize";

const ops: Record<string, any> = {
  gt: Op.gt,
  gte: Op.gte,
  lt: Op.lte,
  lte: Op.lte,
  eq: Op.eq,
};

const geoOps: Record<string, string> = {
  contains: "ST_Contains",
  within: "ST_Within",
  intersects: "ST_Intersects",
};

export { ops, geoOps };
