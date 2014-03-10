/*
  DB configuration
*/
var mongoose = require('mongoose')
mongoose.createConnection('mongodb://localhost/queued')
var Party = mongoose.model('Party')
var Song = mongoose.model('Song')

/*
  Serves JSON to the Angularjs client
*/

var shortId = require('shortid')
var http = require('http')

exports.newParty = function(req, res) {
  var name = req.params.party_name
  var newParty = new Party({
    host_id: '1',
    name: name,
    party_url: shortId.generate()
  })
  newParty.save(function(err) {
    if (err) {
      console.log('Error creating party: ' + err)
      // res.send(err) // bah! ask myles how to handle this error.
    } else {
      console.log('new party created: ' + newParty)
      res.json(newParty)
    }
  })
}

exports.loadParty = function(req, res) {
  console.log('yo we here')
  Party.findOne({party_url: req.params.url}, function(err, obj) {
    console.log('returns the party: ' + obj)
    res.json({
      party: obj
    })
  })
}

exports.joinParty = function(req, res) {
  console.log('joining party: ' + req.params.name)
  Party.findOne({name: req.params.name}, function(err, obj) {
    if (err) {
      console.log('error finding party in DB')
      res.end(err)
    } else {
      res.json({
        party: obj
      })
    }
  })
}

exports.loadSongs = function(req, res) {
  console.log('loading songs...')
  Song.find({}, function(err, songs) {
    res.json({
      songs: songs
    })
  })
}
