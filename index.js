var Firebase = require("firebase");
var express = require('express');
var gatewayPoller = require('./app/gatewayPoller.js');
var dataMapper = require('./app/dataMapper.js');
var gatewayEndpoint = require('./app/gatewayEndpoint.js');
var http = require('http');
var app = express();

var rootFirebase = new Firebase("https://thingkit.firebaseio.com/");
rootFirebase.authWithCustomToken('1U46cpva90E1oa8rqdiQMEnqg89Vefjc7NW7QIph', function(error, authData) {
    if (error) {
        console.log("Login Failed!", error);
    } else {
        console.log("Login Succeeded!", authData);

        gatewayPoller.init(rootFirebase);
        //dataMapper.init(rootFirebase);
    }
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

http.createServer(function(request, response) {
    gatewayEndpoint.store(rootFirebase, request);
}).listen(4444);
