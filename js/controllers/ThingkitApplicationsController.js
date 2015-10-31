class ThingkitApplicationsController extends Controller {

	static get $inject() {
		return ['$scope', '$routeParams', 'firebase', '$uibModal', '$timeout'];
	}

	constructor($scope, $routeParams, firebase, $uibModal, $timeout) {
		super($scope);
		this.firebase = firebase;
		this.$uibModal = $uibModal;
		firebase.getUserApps(snapshot=> $timeout(()=>$scope.apps = snapshot.val()));
	}

	addApp() {
		var modalInstance = this.$uibModal.open({
			animation: true,
			templateUrl: 'addApp.tpl',
			size: 800
		});

		modalInstance.result.then((app) => {
			if (!app || !app.name) {
				return;
			}
			this.firebase.addUserApp(app)
		});
	}

	removeApp(appId) {
		this.firebase.removeApp(appId);
	}

	addNodeApp(appId) {
		var modalInstance = this.$uibModal.open({
			animation: true,
			templateUrl: 'addNodeApp.tpl',
			size: 800
		});

		modalInstance.result.then((node) => {
			if (!node || !node.name) {
				return;
			}
			this.firebase.addNodeUserApp(appId, node)
		});
	}

	removeNodeApp(appId, nodeId) {
		this.firebase.removeNodeApp(appId, nodeId);
	}

}