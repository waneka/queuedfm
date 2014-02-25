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

exports.newParty = function(req, res) {
  var newParty = new Party({
    host_id: '1',
    name: 'leardy',
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
  console.log('party time')
  Party.findOne({name: req.params.name}, function(err, obj) {
    if (err) {
      res.end(err)
    }
    res.json({
      party: obj
    })
  })
}

















