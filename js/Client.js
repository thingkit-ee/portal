var APP_ID = '-K1yJLmpF47dn8dA4B8h';

class Client {
	constructor() {
		angular.module('thingkit-client', [])
			.service('firebase', FirebaseService)
			.controller('ClientController', ['$scope', 'firebase', '$timeout', ($scope, firebase, $timeout)=> {
				firebase.waitInput(APP_ID, (fromNode, key, value)=> {
					$timeout(()=> {
						console.log(fromNode, key, value);
						$scope.lastEvent = value;
						$scope.lastEventNode = fromNode;
					});
				});
			}])
	}
}

new Client();