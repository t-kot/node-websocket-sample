var mongoose = require('mongoose')
  ,Schema = mongoose.Schema
  ,ObjectId = Schema.ObjectId;


var userSchema =  new Schema({
    name: String,
    createAt:{type: Date, default: Date.now}
});

module.exports = mongoose.model("User", userSchema);
