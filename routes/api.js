/*
  DB configuration
*/

var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/queued')
var partySchema = mongoose.Schema({
  host_id: String, name: String, party_url: String
})
var Party = mongoose.model('Party', partySchema)

/*
  Serves JSON to the Angularjs client
*/

var shortId = require('shortid')

exports.newParty = function(req, res) {
  var uniqueUrl = shortId.generate()
  console.log('uniqueUrl: ' + uniqueUrl)
  var newParty = new Party({
    host_id: '1',
    name: 'marty',
    party_url: uniqueUrl
  })
  urlCounter ++
  console.log('urlCounter:' + urlCounter)
  newParty.save()
  console.log(newParty)
  res.json(newParty)
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
















