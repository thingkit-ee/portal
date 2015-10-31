class FirebaseService {

	static get FIREBASE_URL() {
		return "https://thingkit.firebaseio.com";
	}

	constructor() {
		this.ref = new Firebase(FirebaseService.FIREBASE_URL);
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
		this.ref.child("apps").on("value", cb);
	}

	addUserApp(data, cb) {
		this.ref.child("apps").push(data, cb);
	}

	removeApp(appId, cb) {
		this.ref.child("apps").child(appId).remove(cb);
	}

	addNodeUserApp(appId, data, cb) {
		var nodeRef = this.ref.child("node").push(data, (error)=> {
			if (error) {
				return;
			}
			this.ref.child("apps").child(appId).child('nodes').push(nodeRef.key());
		});
	}

}