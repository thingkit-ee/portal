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

	get appsRef() {
		return this.ref.child("apps")
	}

	getUserApps(cb) {
		this.appsRef.on("value", cb);
	}

	addUserApp(data, cb) {
		this.appsRef.push(data, cb);
	}

	removeApp(appId, cb) {
		this.appsRef.child(appId).remove(cb);
	}

	addNodeUserApp(appId, data, cb) {
		this.appsRef.child(appId).child('nodes').push(data, cb);
	}

	removeNodeUserApp(appId, nodeId, cb) {
		this.appsRef.child(appId).child('nodes').child(nodeId).remove(cb);
	}

}