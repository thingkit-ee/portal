class LoginController extends Controller {

	static get $inject() {
		return ['$scope', 'firebase'];
	}

	constructor($scope, firebase) {
		super($scope);
		this.firebase = firebase;
	}

	login() {
		this.firebase.ref.authWithPassword(this.$scope.credentials, function (error, authData) {
			if (error) {
				console.log("Login Failed!", error);
			} else {
				console.log("Authenticated successfully with payload:", authData);
			}
		});
	}
}