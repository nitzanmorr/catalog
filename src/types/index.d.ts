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

export default queryRequest;
