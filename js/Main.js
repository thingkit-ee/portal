class Main {
	constructor() {
		angular.module('thingkit', ['ngRoute'])
			.controller('ThingkitController', ThingkitController)
			.config(['$routeProvider', ($routeProvider) => {
				$routeProvider
					.when('/start', {
						templateUrl: "/partials/login.html",
						controller: 'ThingkitController'
					})
					.otherwise({
						redirectTo: '/start'
					});

				//$locationProvider.html5Mode(true);
			}]);
	}
}

new Main();
