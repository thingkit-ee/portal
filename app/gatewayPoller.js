var CronJob = require('cron').CronJob;
var request = require('request');

var DataScrapper = function() {
    return {
        rootFirebase: null,
        run: function(rootFirebase) {
            var self = this;
            this.rootFirebase = rootFirebase;
            var nodesRef = this.rootFirebase.child('nodes');

            nodesRef.once("value", function(nodesRaw) {
                var nodes = nodesRaw.val();
                for(var key in nodes) {
                    var node = nodes[key];
                    console.log("Current node: " + JSON.stringify(node));
                    self.retrieve(node.id, node.lastReceivedData, function(nodeId, lastReceivedData) {
                        console.log("New Last data retrieved:" + lastReceivedData);
                        nodesRef.child(nodeId).update({
                            lastReceivedData: lastReceivedData
                        });
                    });
                }
            });
        },

        retrieve: function(nodeId, lastReceivedData, callback) {
            var self = this;
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

                    callback(nodeId, newestEventDate);
                }
            })
        }
    }
}

exports.init = function (rootFirebase) {
    //var job = new CronJob('*/5 * * * * *',
    //    function() {
    //        console.log("Periodical polling job started: " + new Date());
    //        var dataScrapper = new DataScrapper();
    //        dataScrapper.run(rootFirebase);
    //    }, null, true
    //);
};