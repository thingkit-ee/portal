exports.store = function (rootFirebase, request) {
    console.log("Message received");
    console.log(request);
    console.log(request.body);
    console.log(request.path);
}