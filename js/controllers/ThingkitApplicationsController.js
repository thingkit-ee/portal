class ThingkitApplicationsController extends Controller {

	static get $inject() {
		return ['$scope', '$routeParams', 'firebase'];
	}

	constructor($scope, $routeParams, firebase) {
		super($scope);
		firebase.getUserApps(apps=>$scope.apps = apps);
	}
}