const express = require("express");
const {
  addproduct,
  getAllProduct,
  singleProduct,
  EditProduct,
  RemoveProduct,
} = require("./productcontroller");

const route = express.Router();

route.post("/add", addproduct);
route.get("/", getAllProduct);
route.get("/:id", singleProduct);
route.put("/:id", EditProduct);
route.delete("/:id", RemoveProduct);

module.exports = route;
