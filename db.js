const monogdb = require("mongodb");
const MongoDBClient = monogdb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoDBClient.connect(process.env.MONGODB_URL)
    .then((client) => {
      console.log("MONGODB Connected Successfully!");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

const getDb = () => {
  if (_db) {
    return _db;
  }
  throw "No database fonund";
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
