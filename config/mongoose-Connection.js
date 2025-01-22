const mongoose = require("mongoose");
const config = require("config");
const debgr = require("debug")("development:mongoose");

// console.log("Config MONGODB_URI:", config.get("MONGODB_URI"));


mongoose
  .connect(`${config.get("MONGODB_URI")}/scatch`)
  .then(function() {
    debgr("connected");
  })
  .catch(function(err) {
    debgr(err);
  });

module.exports = mongoose.connection;
