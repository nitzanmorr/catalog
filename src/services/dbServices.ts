import products from "../models/models";
import queryRequest from "../types/index";
import { Request, Response } from "express";

const getProductByQuery = (req: Request) => {
  const query: any = req.query;
  for (let property of query) {
    for (let operator of property) {
        
    }
  }
};

const addNewProduct = 
export default getProductByQuery;
