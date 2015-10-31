class FirebaseService {


	constructor() {
		this.ref = new Firebase("https://thingkit.firebaseio.com");
	}

	authWithPassword(credentials, cb) {
		this.ref.authWithPassword(credentials, (error, authData) => {
			if (!error) {
				this.token = authData.token;
			}
			cb(error, authData);
		});
	}

	getUserApps(cb) {
		cb([{foo: 123}])
	}

}