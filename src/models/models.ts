import { sq } from "../configs/db";
import { DataTypes } from "sequelize";

const products = sq.define("products", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING(48) },
  description: { type: DataTypes.TEXT },
  bounding_polygon: { type: DataTypes.GEOGRAPHY("POLYGON", 4326) },
  consumtion_link: { type: DataTypes.TEXT },
  type: {
    type: DataTypes.ENUM("raster", "rasterized vector", "3d tiles", "QMesh"),
  },
  consumption_protocol: {
    type: DataTypes.ENUM("WMS", "WMTS", "XYZ", "3D Tiles"),
  },
  resolution_best: { type: DataTypes.FLOAT },
  min_zoom: { type: DataTypes.INTEGER },
  max_zoom: { type: DataTypes.INTEGER },
});

products.sync().then(() => {
  console.log("products model synced");
});

export default products;
