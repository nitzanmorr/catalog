import { QueryBody } from "../types";
import { geoOps } from "./operationMaps";

const geoQueryHandler = (body: Array<QueryBody>) => {
  let operators: Array<string> = [];
  for (const record of body) {
    operators.push(
      `${
        geoOps[record.operator]
      } (bounding_polygon::geometry, ST_GeomFromGeoJSON('${JSON.stringify(
        record.polygon
      )}')::geography::geometry)`
    );
  }
  return operators;
};

export default geoQueryHandler;
