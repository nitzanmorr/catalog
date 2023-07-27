import products from "../models/models";
import queryRequest from "../types/index";
import { Request, Response } from "express";
import { Op } from "sequelize";
import Sequelize from "sequelize";
import { Fn } from "sequelize/types/utils";
import { Literal, sql } from "@sequelize/core";
import { sq } from "../configs/db";

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
  let operators: Array<string> = [];
  for (const record of body) {
    operators.push(
      `${
        geoOps[record.operator]
      } (bounding_polygon::geometry, ST_GeomFromGeoJSON('${JSON.stringify(
        record.polygon
      )}')::geography::geometry)`
      // sq.fn(
      //   geoOps[record.operator],
      //   Sequelize.col("bounding_polygon"),
      //   record.polygon
      // )
    );
  }
  return operators;
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
  const body: Array<QueryBody> = req.body as Array<QueryBody>;
  let operators: Object[] = [];
  const geoOperations = geoQueryHandler(body);
  // operators = geoOperations;

  //Iterate through the properties in the query
  for (const [key, value] of Object.entries(query)) {
    for (let [opKey, opVal] of Object.entries(value)) {
      const op = ops[opKey];
      operators.push({ [key]: { [op]: opVal } });
      console.log(`Pushed ${key}: {${opKey}: ${opVal}}`);
    }
  }

  console.log(geoOperations, 2630);
  const data = products.findAll({
    where: Sequelize.literal(
      // `ST_Contains (bounding_polygon::geometry, ST_GeomFromGeoJSON('{"type": "polygon", "coordinates": [[[0, 1], [1, 2]]]}')::geography::geometry)`
      geoOperations[0]
    ),
    operators,
  });
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

export { getProductByQuery, createProduct, geoQueryHandler };
