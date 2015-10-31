class Main {
	constructor() {
		angular.module('thingkit', ['ngRoute'])
			.controller('ThingkitController', ThingkitController)
			.config(['$routeProvider', ($routeProvider) => {
				$routeProvider
					.when('/start', {
						template: "{{getHello()}}",
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
