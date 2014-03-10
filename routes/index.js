/*
 * DB config
 */
var mongoose = require('mongoose')
mongoose.createConnection('mongodb://localhost/queued')
var User = mongoose.model('User')

/*
 * GET home page.
 */
 var http = require('http')
 var qs = require('querystring')
 var request = require('request')

exports.index = function(req, res){
  res.render('index.html', { title: 'Queued' });
};

exports.home = function(req, res) {
  var code = req.query.code
  console.log('Access Code: ' + code)
  var authCode = new Buffer('3OUutphWh4HtZu_iRQPcMA:w_Rrx17rYF5CeEHNzI4tuA').toString('base64')
  console.log('AuthCode: ' + authCode)

  var params = {
    grant_type: 'authorization_code'
    , code: code
    , redirect_uri: 'http://localhost:3000/home'
  }

  var stringParams = qs.stringify(params)
  console.log('Params: ' + stringParams)

  request.post({
    url: 'http://www.rdio.com/oauth2/token'
    , body: stringParams
    , headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        , 'Authorization': 'Basic ' +  authCode
      }
    }, function(err, res, body) {
    console.log('err: ' + err)
    console.log('res: ' + res)
    console.log('res code: ' + res.statusCode)
    console.log('body: ' + body)
    // var newUser = new User({})
  })
  res.render('index.html')
}
