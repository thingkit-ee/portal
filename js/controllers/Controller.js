class Controller {

	constructor($scope) {
		if (!$scope) {
			return;
		}
		this.$scope = $scope;

		for (var methodName of Object.getOwnPropertyNames(this.constructor.prototype)) {
			var method = this[methodName];
			if (angular.isFunction(method) && methodName != 'constructor') {
				$scope[methodName] = method.bind(this);
			}
		}
	}

}