import { GeoJSON } from "geojson";
import { EnumType } from "typescript";

interface queryRequest extends JSON {
  id: Number;
  name: String;
  description: String;
  bounding_polygon: GeoJSON;
  consumtion_link: String;
  type: EnumType;
  consumption_protocol: EnumType;
  resolution_best: Number;
  min_zoom: Number;
  max_zoom: Number;
}

type QueryParam = {
  name?: Record<string, string>;
  type?: Record<string, string>;
  consumption_protocol?: Record<string, string>;
  resolution_best?: Record<string, string>;
  min_zoom?: Record<string, number>;
  max_zoom?: Record<string, number>;
};

type QueryBody = {
  operator: string;
  polygon: string;
};

export default queryRequest;
export {QueryParam, QueryBody}
