import products from "../models/models";
import queryRequest, { QueryParam, QueryBody } from "../types/index";
import { Request, Response } from "express";
import { Op } from "sequelize";
import Sequelize from "sequelize";
import { Fn } from "sequelize/types/utils";
import { Literal, sql } from "@sequelize/core";
import { sq } from "../configs/db";
import { ops, geoOps } from "./operationMaps";
import geoQueryHandler from "./geoServices";

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
  //insert the geo operations to the operators array
  operators = geoOperations.map((x) => {
    return { [Op.and]: Sequelize.literal(x) };
  });

  //Iterate through the properties in the query
  for (const [key, value] of Object.entries(query)) {
    for (let [opKey, opVal] of Object.entries(value)) {
      const op = ops[opKey];
      operators.push({ [key]: { [op]: opVal } });
      console.log(`Pushed ${key}: {${opKey}: ${opVal}}`);
    }
  }

  const data = products.findAll({
    where: operators,
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

const getProductById = (id: number) => {
  
}

export { getProductByQuery, createProduct };
