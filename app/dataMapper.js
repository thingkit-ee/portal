var Slack = require('node-slackr');

exports.init = function (rootFirebase) {
    var multiSensorNodeId = "000011BD";

    console.log("Register listener for event:" + multiSensorNodeId)
    rootFirebase.child('events/' + multiSensorNodeId).on("child_added", function(snapshot, prevChildKey) {
        console.log("Event for node " + multiSensorNodeId + " was added with data: " + snapshot.val().data_plain);

        var data;
        try {
            data = eval("(" + snapshot.val().data_plain + ")");
        } catch(e) {
            console.error(e)
        }

        if (!data) return;
        console.log("Event data " + JSON.stringify(data));

        rootFirebase.child('events/' + multiSensorNodeId).once("value", function(rows) {
            console.log("Update row count: " + rows.numChildren());
            rootFirebase.child('chart').update({
                eventsTotal: rows.numChildren()
            });
        });

        if (data.A) {
            rootFirebase.child('chart').update({
                bendSensor: data.A
            });

            console.log("Update data for chart A: " + data.A)
        }
    });


    rootFirebase.child('event2').on("child_added", function(snapshot, prevChildKey) {
        console.log("Event was added from gateway");
        console.log(snapshot.val());
        if (snapshot.val().stat) return;
        var slack = new Slack('https://hooks.slack.com/services/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');
        slack.notify("You got mail!");
    });
}
