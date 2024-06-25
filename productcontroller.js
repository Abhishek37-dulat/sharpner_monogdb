const Product = require("./Product");

exports.addproduct = async (req, res) => {
  try {
    const name = req.body.name;
    const details = req.body.details;

    const data = await new Product(name, details, null, req.user);
    console.log("create", data);
    data
      .save()
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.getAllProduct = async (req, res) => {
  try {
    const data = await Product.fetchAll();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.singleProduct = async (req, res) => {
  try {
    const data = await Product.fetchById(req.params.id);
    res.send(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

exports.EditProduct = async (req, res) => {
  try {
    const { name, details } = req.body;
    const data = await Product.fetchById(req.params.id);
    if (!data) {
      res.send("product not found!");
    }
    let id = req.params.id;
    const tempdata = new Product(name, details, id);
    const result = await tempdata.save();

    console.log("result :: ", result);
    res.send(result);
  } catch (error) {
    console.log("result error :: ", error);
    res.send(error);
  }
};

exports.RemoveProduct = async (req, res) => {
  try {
    const data = await Product.fetchById(req.params.id);
    if (!data) {
      res.send("product not found!");
    }
    const result = await Product.deleteProduct(req.params.id);

    console.log("result :: ", result);
    res.send(result);
  } catch (error) {
    console.log("result error :: ", error);
    res.send(error);
  }
};
