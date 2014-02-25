var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator')

module.exports = function() {
  var partySchema = new Schema({
    host_id: String
    , name: { type: String, unique: true }
    , party_url: { type: String, unique: true }
    , created_at: { type: Date, default: Date.now }
    , updated_at: { type: Date, default: Date.now }
  });
  mongoose.model("Party", partySchema);
};
