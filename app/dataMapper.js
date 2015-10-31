exports.init = function (rootFirebase) {
    var multiSensorNodeId = "000011BD";


    console.log("Register listener for event:" + multiSensorNodeId)
    rootFirebase.child('events/' + multiSensorNodeId).on("child_added", function(snapshot, prevChildKey) {
        console.log("Event for :" + multiSensorNodeId + " was added");
        var data
        try {
            data = JSON.parse(snapshot.data_plain);
        } catch(e) {
            console.error(e)
        }
        if (!data) return
        if (!data.A) {
            rootFirebase.child('chart').update({
                bendSensor: data.A
            });

            console.log("Update data for chart A: " + data.A)
        }
    });
}
