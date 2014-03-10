var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator')

module.exports = function() {
  var userSchema = new Schema({
    name: String
  });
  mongoose.model("User", userSchema);
};
