class LoginController extends Controller {

	static get $inject() {
		return ['$scope', 'firebase', '$location'];
	}

	constructor($scope, firebase, $location) {
		super($scope);
		this.firebase = firebase;
		this.$location = $location;
	}

	login() {
		this.$scope.loginError = null;
		this.firebase.authWithPassword(this.$scope.credentials, (error, authData) => {
			console.log(error, authData);
			if (error) {
				this.$scope.loginError = error;
				this.$scope.$apply();
			} else {
				this.$location.path("/apps");
			}
		});
	}
}