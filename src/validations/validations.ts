import { query, body } from "express-validator";

const queryValidateChain = [
  query("name")
    .optional()
    .custom((value: Object) => {
      if (Object.keys(value)[0] !== "eq") {
        return false;
      }
      return true;
    })
    .withMessage("name field only takes operator 'eq'"),
  query("name.eq").optional().isString().withMessage("name has to be string"),
  query("type")
    .optional()
    .custom((value: Object) => {
      if (Object.keys(value)[0] !== "eq") {
        return false;
      }
      return true;
    })
    .withMessage("type field only takes operator 'eq'"),
  query("type.eq")
    .optional()
    .isString()
    .withMessage("type has to be a string")
    .isIn(["raster", "rasterized vector", "3d tiles", "QMesh"])
    .withMessage(
      "type has to be one of the following: raster, rasterized vector, 3d tiles, QMesh"
    ),
  query("consumption_protocol")
    .optional()
    .custom((value: Object) => {
      if (Object.keys(value)[0] !== "eq") {
        return false;
      }
      return true;
    })
    .withMessage("consumption_protocol field only takes operator 'eq'"),
  query("consumption_protocol.eq")
    .optional()
    .isString()
    .withMessage("consumption_protocol has to be a string")
    .isIn(["WMS", "WMTS", "XYZ", "3D Tiles"])
    .withMessage(
      "consumption_protocol has to be one of the following: WMS, WMTS, XYZ, 3D Tiles"
    ),
  query("resolution_best")
    .optional()
    .custom((value: Object) => {
      const validOperators = ["eq", "gt", "gte", "lt", "lte"];
      const operator = Object.keys(value)[0];
      if (!validOperators.includes(operator)) {
        return false;
      }
      return true;
    })
    .withMessage(
      "resolution_best field only takes operators 'eq', 'gt', 'gte', 'lt', 'lte'"
    ),
  query("resolution_best.*")
    .optional()
    .isNumeric()
    .withMessage("resolution_best has to be a number"),
  query("min_zoom")
    .optional()
    .custom((value: Object) => {
      const validOperators = ["eq", "gt", "gte", "lt", "lte"];
      const operator = Object.keys(value)[0];
      if (!validOperators.includes(operator)) {
        return false;
      }
      return true;
    })
    .withMessage(
      "min_zoom field only takes operators 'eq', 'gt', 'gte', 'lt', 'lte'"
    ),
  query("min_zoom.*")
    .exists({ checkNull: true })
    // .optional()
    .isInt()
    .withMessage("min_zoom has to be an integer"),
  query("max_zoom")
    .optional()
    .custom((value: Object) => {
      const validOperators = ["eq", "gt", "gte", "lt", "lte"];
      const operator = Object.keys(value)[0];
      if (!validOperators.includes(operator)) {
        return false;
      }
      return true;
    })
    .withMessage(
      "max_zoom field only takes operators 'eq', 'gt', 'gte', 'lt', 'lte'"
    ),
  query("max_zoom.*")
    .optional()
    .isInt()
    .withMessage("max_zoom has to be an integer"),
];

const newProductValidateChain = [
  body("name")
    .exists()
    .not()
    .isEmpty()
    .withMessage("name cannot be empty")
    .isString()
    .withMessage("name has to be string")
    .isLength({ min: 0, max: 48 })
    .withMessage("name length has to be between 0 and 48"),
  body("description")
    .exists()
    .not()
    .isEmpty()
    .withMessage("description cannot be empty")
    .isString()
    .withMessage("description has to be string"),
  //bounding_polygon
  body("consumtion_link")
    .exists()
    .not()
    .isEmpty()
    .withMessage("description cannot be empty")
    .isString()
    .withMessage("description has to be string"),
  body("type")
    .exists()
    .not()
    .isEmpty()
    .withMessage("type cannot be empty")
    .isString()
    .withMessage("type has to be string")
    .isIn(["raster", "rasterized vector", "3d tiles", "QMesh"])
    .withMessage(
      "type has to be one of the following: raster, rasterized vector, 3d tiles, QMesh"
    ),
  body("consumption_protocol")
    .exists()
    .not()
    .isEmpty()
    .withMessage("consumption_protocol cannot be empty")
    .isString()
    .withMessage("consumption_protocol has to be string")
    .isIn(["WMS", "WMTS", "XYZ", "3D Tiles"])
    .withMessage(
      "consumption_protocol has to be one of the following: WMS, WMTS, XYZ, 3D Tiles"
    ),
  body("resolution_best")
    .exists()
    .not()
    .isEmpty()
    .withMessage("resolution_best cannot be empty")
    .isFloat()
    .withMessage("resolution_best has to be a float"),
  body("min_zoom")
    .exists()
    .not()
    .isEmpty()
    .withMessage("min_zoom cannot be empty")
    .isInt()
    .withMessage("min_zoom has to be an integer"),
  body("max_zoom")
    .exists()
    .not()
    .isEmpty()
    .withMessage("max_zoom cannot be empty")
    .isInt()
    .withMessage("max_zoom has to be an integer"),
];

export { queryValidateChain, newProductValidateChain };
