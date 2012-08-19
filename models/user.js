var mongo = require('mongoose');

mongo.connect('mongodb://localhost/node-websocket-sample');

var Schema = mongo.Schema;

var User = mongo.model('users', new Schema({
    name: String,
    createAt:{type: Date, default: Date.now}
  })
);

module.exports = User;
