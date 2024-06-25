const getDb = require("./db").getDb;
const mongodb = require("mongodb");

class Product {
  constructor(name, details, id, userId) {
    this.name = name;
    this.details = details;
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.userId = new mongodb.ObjectId(userId);
  }
  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      console.log("update triger", this);
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this });
    } else {
      console.log("insert triger");
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((data) => {
        return data;
      })
      .catch((err) => console.log(err));
  }
  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  }
  static fetchById(id) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then((data) => {
        return data;
      })
      .catch((err) => {
        return err;
      });
  }
  static deleteProduct(id) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then((data) => data)
      .catch((err) => err);
  }
}

module.exports = Product;
