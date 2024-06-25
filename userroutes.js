const express = require("express");
const {
  createUser,
  fetchUser,
  getAllUser,
  editUser,
  deleteUser,
} = require("./usercontroller");

const route = express.Router();

route.post("/create", createUser);
route.get("/:id", fetchUser);
route.get("/", getAllUser);
route.put("/:id", editUser);
route.delete("/:id", deleteUser);

module.exports = route;
