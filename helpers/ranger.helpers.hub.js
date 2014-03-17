Ranger.defineHelper("hub", ["pubsub", "console"], function(pubsub, console) {

    var subscriptionTokens = [];

    this.publish = function(topic, data) {
        console.log("published " + topic);
        pubsub.publish(topic, data);
    };

    this.subscribe = function(topic, func) {
        console.log("subscribed to " + topic);
        var token = pubsub.subscribe(topic, function(msg, data){
            console.log("received " + topic);
            func(msg, data);
        }.bind(this));
        subscriptionTokens.push(token);
    };
 });