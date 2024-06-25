const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const mongoConnect = require("./db").mongoConnect;
const productroute = require("./routes");
const userroute = require("./userroutes");
const User = require("./User");

const PORT = 8002;
app.use(express.json());
app.use((req, res, next) => {
  User.findById("6679e3d5e41e77814b47cf4a")
    .then((data) => {
      console.log(data);
      req.user = data._id;
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});
app.use("/product", productroute);
app.use("/user", userroute);

mongoConnect(() => {
  app.listen(PORT, () => {
    console.log("listening to PORT: ", PORT);
  });
});
