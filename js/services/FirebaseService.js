class FirebaseService {

	static get FIREBASE_URL() {
		return "https://thingkit.firebaseio.com";
	}

	constructor() {
		this.ref = new Firebase(FirebaseService.FIREBASE_URL);
	}

	authWithPassword(credentials, cb) {
		this.ref.authWithPassword(credentials, cb);
	}

	authWithFacebook(cb) {
		this.ref.authWithOAuthPopup("facebook", cb);
	};

	getAppsRef() {
		if (!this.auth) {
			this.auth = this.ref.getAuth();
		}
		return this.ref.child("apps").child(this.auth.uid)
	}

	getAppRef(appId) {
		return this.getAppsRef().child(appId)
	}

	getUserApps(cb, cbErr) {
		this.getAppsRef().on("value", cb, cbErr);
	}

	getEvents(cb){
		this.ref.child("events").on("value", cb)
	}

	addUserApp(data, cb) {
		this.getAppsRef().push(data, cb);
	}

	removeApp(appId, cb) {
		this.getAppRef(appId).remove(cb);
	}

	addNodeUserApp(appId, data, cb) {
		this.getAppRef(appId).child('nodes').push(data, cb);
	}

	removeNodeUserApp(appId, nodeId, cb) {
		this.getAppRef(appId).child('nodes').child(nodeId).remove(cb);
	}

	waitInput(appId, cb) {
		this.getAppRef(appId).child('nodes').on("value", (snap)=> {
			var nodes = snap.val();
			for (var nodeKey in nodes) {
				var nodeId = nodes[nodeKey].id;
				if (!nodeId)return;
				this.ref.child("events").child(nodeId).on("child_added", (snap)=> {
					cb(nodeId, snap.key(), snap.val());

					//TODO: enable me after final debug
					//snap.ref().remove();
				});
			}
		})
	}

}