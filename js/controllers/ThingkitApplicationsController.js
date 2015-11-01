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
		firebase.getApps(snapshot=> $timeout(()=>$scope.apps = snapshot.val()), this.redirectToLogin.bind(this));
		firebase.getEvents(snapshot=> $timeout(()=> {
			$scope.events = snapshot;

			/*var x = snapshot.val()['000011BD'];
			var arr = Object.keys(x).map(k => x[k])
			arr.sort((a,b)=>new Date(a.time)< new b.time)*/

			/*arr.reduce((prev, current)=> {
			 if (!prev || !current) {
			 return;
			 }
			 console.log(+new Date(prev.time) - (+new Date(current.time)));

			 if (+new Date(prev.time) - (+new Date(current.time)) < 1000 * 60 * 30) {
			 console.log(current, prev)
			 }
			 });*/

			/*var labels = [];
			var data = [];
			for (var i in x) {

			}

			arr.forEach((el)=> {
				labels.push(el.time);
				data.push(+new Date(el.time))
			});

			new Chartist.Line('.ct-chart', {
				labels: labels,
				series: [data]
			}, {
				fullWidth: true,
				chartPadding: {
					right: 40
				}
			});*/


		}));


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
			this.firebase.addApp(app)
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
			node.lastReceivedData = new Date();
			this.firebase.addNodeApp(appId, node)
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