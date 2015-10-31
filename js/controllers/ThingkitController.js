class ThingkitController extends Controller {

	static get $inject() {
		return ['$scope', '$routeParams'];
	}

	constructor($scope, $routeParams) {
		super($scope)
	}

	getHello(payment) {
		return 'hello world'
	}

}