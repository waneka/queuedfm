var mongoose = require('mongoose')
var uniqueValidator = require('mongoose-unique-validator')
var Schema = mongoose.Schema

module.exports = function() {
  var songSchema = new Schema({
    name: String
    , album: String
    , artist: String
    , img_url: String // 'icon'
    , duration: Number
    , key: String
    , vote_count: Number
  })
  mongoose.model('Song', songSchema)
}

