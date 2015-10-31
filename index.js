var Firebase = require("firebase");
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

var rootFirebase = new Firebase("https://thingkit.firebaseio.com/app/data");
rootFirebase.authWithCustomToken('1U46cpva90E1oa8rqdiQMEnqg89Vefjc7NW7QIph', function(error, authData) {
    if (error) {
        console.log("Login Failed!", error);
    } else {
        console.log("Login Succeeded!", authData);
    }
});

app.get('/data', function(request, response) {
    var usersRef = rootFirebase.child('users');
    usersRef.update({
        admin: {
            login: "admin123",
            password: "q1w2e3r4"
        },
        user: {
            login: "user",
            password: "q1w2e3r4"
        }
    });
    response.send('Done!')
});

app.get('/login', function(request, response) {
  var FirebaseTokenGenerator = require("firebase-token-generator");
  var tokenGenerator = new FirebaseTokenGenerator("pvFPrznHD8GecmraJbDvQ7wwVaklEafFBxPkQFxs");
  var token = tokenGenerator.createToken(
      {uid: "1", some: "arbitrary", data: "here"},
      {admin: true}
  );

  response.send('Token' + token)
})


