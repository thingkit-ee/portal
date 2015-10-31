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
		this.firebase.authWithPassword(this.$scope.credentials, this.onAuth);
	}

	loginFb() {
		this.firebase.authWithFacebook(this.onAuth)
	}

	onAuth(error, authData) {
		if (error) {
			this.$scope.loginError = error;
		} else {
			this.$location.path("/apps");
		}
		this.$scope.$apply();
	}
}