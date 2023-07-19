import products from "../models/models";
import queryRequest from "../types/index";
import { Request, Response } from "express";
import { Op } from "sequelize";

const numberOps = {
  'gt': Op.gt,
  'gte': Op.gte,
  'lt': Op.lte,
  'lte': Op.lte,
  'eq': Op.eq,
};

type QueryParam = {
  name?: Record<string, string>;
  type?: string;
  consumption_protocol?: string;
  resolution_best?: string;
  min_zoom?: Record<string, number>;
  max_zoom?: Record<string, number>;
}

const propertiesForQuery: queryParam  = {
  'name': 'string',
  'type': "enum",
  'consumption_protocol': "enum",
  'resolution_best': "number",
  'min_zoom': "number",
  'max_zoom': "number",
};

url/?min_zoom[gt]=3&min_zoom[lt]=5&name[eq]="dsad"

query{
  min_zoom: {
    gt:3,
    gte:8"
  }
}

const getProductByQuery = (req: Request) => {
  const query: QueryParam = req.query as QueryParam;
  console.log("query: ",query);
  if (query.min_zoom) {
    cons
  }
  let operators: Object = new Object();

  

  for (const [key, value] of Object.entries(query)) {
    console.log(`${key}: ${value}`);
    if(propertiesForQuery[key] === "number"){
      propertiesForQuery.property = 'sgtsgsg';
    }
  }
};



export default getProductByQuery;
