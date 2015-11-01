var CronJob = require('cron').CronJob;
var request = require('request');

var DataScrapper = function() {
    return {
        rootFirebase: null,
        run: function(rootFirebase) {
            var self = this;
            this.rootFirebase = rootFirebase;
            var appsRef = this.rootFirebase.child('apps');

            appsRef.once("value", function(appsRaw) {
                var apps = appsRaw.val();
                for (var userId in apps) {
                    var userApps = apps[userId];
                    for (var appKey in userApps) {
                        var app = userApps[appKey];
                        for (var nodeKey in app.nodes) {
                            var node = app.nodes[nodeKey];
                            console.log("Current node: " + JSON.stringify(node));
                            self.retrieve(node.lastReceivedData, userId, appKey, nodeKey, node.id, function (lastReceivedData, userId, appKey, nodeKey) {
                                console.log("New Last data retrieved:" + lastReceivedData);
                                self.rootFirebase.child('apps/' + userId + "/" + appKey + "/nodes/" + nodeKey).update({
                                    lastReceivedData: lastReceivedData
                                });
                            });
                        }
                    }
                }
            });
        },

        retrieve: function(lastReceivedData, userId, appKey, nodeKey, nodeId, callback) {
            var self = this;
            console.log("Retrieving data for node: " + nodeId);
            var url = "http://thethingsnetwork.org/api/v0/nodes/" + nodeId + "?limit=100";
            if (!lastReceivedData) {
                lastReceivedData = 0;
            }
            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var data = JSON.parse(body)

                    console.log('Size: ' + data.length);
                    console.log('Last recorded event date: ' + lastReceivedData);
                    var filteredData = data.filter(function(el) {
                        return new Date(el.time).getTime() > new Date(lastReceivedData).getTime()
                    })

                    var newestEventDate = new Date(lastReceivedData);
                    filteredData.forEach(function(event) {
                        var events = self.rootFirebase.child('events/' + nodeId);
                        events.push(event);
                        var eventDate = new Date(event.time);
                        if (eventDate.getTime() > newestEventDate.getTime()) {
                            newestEventDate = eventDate;
                        }
                    })

                    console.log('Filtered size: ' + filteredData.length);
                    callback(newestEventDate, userId, appKey, nodeKey);
                }
            })
        }
    }
}

exports.init = function (rootFirebase) {
    var job = new CronJob('*/10 * * * * *',
        function() {
            console.log("Periodical polling job started: " + new Date());
            var dataScrapper = new DataScrapper();
            dataScrapper.run(rootFirebase);
        }, null, true
    );
};