class ThingkitApplicationsController extends Controller {

	static get $inject() {
		return ['$scope', '$routeParams', 'firebase', '$uibModal', '$timeout', '$location'];
	}

	constructor($scope, $routeParams, firebase, $uibModal, $timeout, $location) {
		super($scope);
		this.firebase = firebase;
		this.$uibModal = $uibModal;
		this.$timeout = $timeout;
		this.$location = $location;
		firebase.getUserApps(snapshot=> $timeout(()=>$scope.apps = snapshot.val()), this.redirectToLogin.bind(this));
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

	getAuth() {
		let _auth = this.firebase.auth;
		return _auth[_auth.provider];
	}

	redirectToLogin() {
		this.$timeout(this.$location.path("/login"))
	}

	logout() {
		this.firebase.ref.unauth();
		this.redirectToLogin();
	}


}