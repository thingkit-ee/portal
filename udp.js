var Firebase = require("firebase");

var rootFirebase = new Firebase("https://thingkit.firebaseio.com/");
rootFirebase.authWithCustomToken('1U46cpva90E1oa8rqdiQMEnqg89Vefjc7NW7QIph', function (error, authData) {
	if (error) {
		console.log("Firebase Login Failed!", error);
		return;
	}
	console.log("Frebase Login Succeeded!", authData);
	var dgram = require('dgram');
	var server = dgram.createSocket('udp4');

	server.on('listening', function () {
		var address = server.address();
		console.log('UDP Server listening on ' + address.address + ":" + address.port);
	});

	server.on('message', function (message, remote) {
		message = '' + message;
		message = message.slice(message.indexOf('{'));
		console.log(message);
		rootFirebase.child('event2').push(JSON.parse(message));
	});

	server.bind(4444, '84.200.17.174');
});