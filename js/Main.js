class Main {
	constructor() {
		angular.module('thingkit', ['ngRoute'])
			.controller('ThingkitApplicationsController', ThingkitApplicationsController)
			.controller('LoginController', LoginController)
			.service('firebase', FirebaseService)
			.config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
				$routeProvider
					.when('/login', {
						templateUrl: "/partials/login.html",
						controller: 'LoginController'
					})
					.when('/apps', {
						templateUrl: "/partials/apps.html",
						controller: 'ThingkitApplicationsController'
					})
					.otherwise({
						redirectTo: '/login'
					});

				//$locationProvider.html5Mode(true);
			}]);
	}
}

new Main();
