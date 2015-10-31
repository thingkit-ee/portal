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
                for (var appKey in apps) {
                    var app = apps[appKey];
                    for (var nodeKey in app.nodes) {
                        var node = app.nodes[nodeKey];
                        console.log("Current node: " + JSON.stringify(node));
                        self.retrieve(node.lastReceivedData, appKey, nodeKey, node.name, function (lastReceivedData, appKey, nodeKey) {
                            console.log("New Last data retrieved:" + lastReceivedData);
                            self.rootFirebase.child('apps/' + appKey + "/nodes/" + nodeKey).update({
                                lastReceivedData: lastReceivedData
                            });
                        });
                    }
                }
            });
        },

        retrieve: function(lastReceivedData, appKey, nodeKey, nodeId, callback) {
            var self = this;
            console.log("Retrieving data for node: " + nodeId);
            var url = "http://thethingsnetwork.org/api/v0/nodes/" + nodeId + "?limit=50";
            if (!lastReceivedData) {
                lastReceivedData = 0;
            }
            request(url, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var data = JSON.parse(body)

                    console.log('Size: ' + data.length);
                    var filteredData = data.filter(function(el) {
                        return new Date(el.time) > lastReceivedData
                    })

                    var newestEventDate = lastReceivedData;
                    filteredData.forEach(function(event) {
                        var events = self.rootFirebase.child('events/' + nodeId);
                        events.push(event);
                        var eventDate = new Date(event.time);
                        if (eventDate > newestEventDate) {
                            newestEventDate = eventDate;
                        }
                    })

                    console.log('Filtered size: ' + filteredData.length);
                    callback(newestEventDate, appKey, nodeKey);
                }
            })
        }
    }
}

exports.init = function (rootFirebase) {
    var job = new CronJob('*/5 * * * * *',
        function() {
            console.log("Periodical polling job started: " + new Date());
            var dataScrapper = new DataScrapper();
            dataScrapper.run(rootFirebase);
        }, null, true
    );
};