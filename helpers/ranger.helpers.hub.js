Ranger.defineHelper("hub", ["pubsub", "console"], function(pubsub, module, console) {

    var subscriptionTokens = [];

    this.publish = function(topic, data) {
        safeLog("published " + topic);
        pubsub.publish(topic, data);
    };

    this.subscribe = function(topic, func) {
        safeLog("subscribed to " + topic);
        subscriptionTokens.push(pubsub.subscribe(topic, function(msg, data){
            safeLog("received " + topic);
            func(msg, data);
        }.bind(this)));
    };

    var safeLog = function(msg) {
        var modName = this.moduleBackRef ? this.moduleBackRef.namespace : "unknown";
        if(console && console.log && typeof console.log === "function") {
            console.log(modName + " " + msg);
        }
    };
 });