Ranger.define("listapp.listmediator", ["jquery", "hub"], function($, hub) {

    hub.subscribe("additem", function(topic, data){
        $(".main-list").append("<li>").append(data);
    });

});