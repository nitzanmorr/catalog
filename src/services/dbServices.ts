import { resourceLimits } from "worker_threads";
import products from "../models/models";
import queryRequest from "../types/index";
import { Request, Response } from "express";
import { Op, where } from "sequelize";
import { type } from "os";
import Sequelize from "sequelize";
import { Fn } from "sequelize/types/utils";

const numberOps: Record<string, any> = {
  gt: Op.gt,
  gte: Op.gte,
  lt: Op.lte,
  lte: Op.lte,
  eq: Op.eq,
};

type QueryParam = {
  name?: Record<string, string>;
  type?: Record<string, string>;
  consumption_protocol?: Record<string, string>;
  resolution_best?: Record<string, string>;
  min_zoom?: Record<string, number>;
  max_zoom?: Record<string, number>;
};

const propertiesForQuery: Record<string, string> = {
  name: "string",
  type: "enum",
  consumption_protocol: "enum",
  resolution_best: "number",
  min_zoom: "number",
  max_zoom: "number",
  contains: "geo",
  within: "geo",
  intersects: "geo",
};

type QueryBody = {
  operator: string;
  polygon: string;
};

const geoQueryHandler = (body: Array<QueryBody>) => {
  let operators: Array<Fn> = [];
  for (const record of body) {
    operators.push(
      Sequelize.fn(
        record.operator,
        Sequelize.col("bounding_polygon"),
        record.polygon
      )
    );
  }
};

// url/?min_zoom[gt]=3&min_zoom[lt]=5&name[eq]="dsad"

// query{
//   min_zoom: {
//     gt:3,
//     gte:8"
//   }
// }

//body:
// [
// {"operator": "contains",
//  "polygon": {"type": "Polygon", "coordinates": [[[1, 2], [3, 4], [5, 6], [1, 2]]]}
//}
// ]

const getProductByQuery = (req: Request) => {
  const query: QueryParam = req.query as QueryParam;
  let operators: Object[] = [];

  //Iterate through the properties in the query
  for (const [key, value] of Object.entries(query)) {
    if (propertiesForQuery[key] === "geo") {
    }
    // if (propertiesForQuery[key] === "number") {
    for (let [opKey, opVal] of Object.entries(value)) {
      const op = numberOps[opKey];
      operators.push({ [key]: { [op]: opVal } });
      console.log(`Pushed ${key}: {${opKey}: ${opVal}}`);
    }
    // }
  }

  const data = products.findAll({ where: operators });
  return data;
};

const createProduct = async (product: Object) => {
  try {
    const createdProduct = await products.create(product);
    return createdProduct;
  } catch (error) {
    return error;
  }
};

export { getProductByQuery, createProduct };
