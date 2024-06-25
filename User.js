const getDb = require("./db").getDb;
const mongodb = require("mongodb");

class User {
  constructor(name, email, password, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this._id = id ? new mongodb.ObjectId(id) : null;
  }
  save() {
    const db = getDb();
    let tempDb = db;
    if (this._id) {
      return tempDb
        .collection("Users")
        .updateOne({ _id: this._id }, { $set: this })
        .then((data) => data)
        .catch((err) => err);
    } else {
      return tempDb
        .collection("Users")
        .insertOne(this)
        .then((data) => data)
        .catch((err) => err);
    }
  }

  static findById(id) {
    const db = getDb();
    return db
      .collection("Users")
      .find({ _id: new mongodb.ObjectId(id) })
      .next()
      .then((data) => data)
      .catch((err) => err);
  }

  static findAllUsers() {
    const db = getDb();
    return db
      .collection("Users")
      .find()
      .toArray()
      .then((data) => data)
      .catch((err) => err);
  }

  static deleteUser(id) {
    const db = getDb();
    return db
      .collection("Users")
      .deleteOne({ _id: new mongodb.ObjectId(id) })
      .then((data) => data)
      .catch((err) => err);
  }
}

module.exports = User;
