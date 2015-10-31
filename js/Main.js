class Main {
	constructor() {
		angular.module('thingkit', ['ngRoute'])
			.controller('ThingkitController', ThingkitController)
			.controller('LoginController', LoginController)
			.service('firebase', FirebaseService)
			.config(['$routeProvider', ($routeProvider) => {
				$routeProvider
					.when('/login', {
						templateUrl: "/partials/login.html",
						controller: 'LoginController'
					})
					.when('/login', {
						templateUrl: "/partials/login.html",
						controller: 'LoginController'
					})
					.otherwise({
						redirectTo: '/login'
					});

				//$locationProvider.html5Mode(true);
			}]);
	}
}

new Main();
