Ranger.define("listapp.listmediator", ["jquery", "hub"], function($, hub) {

    hub.subscribe("additem", function(e){
        $(".main-list").append("<li>").append(e.data);
    });

});