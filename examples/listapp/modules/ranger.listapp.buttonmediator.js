Ranger.define("listapp.buttonmediator",["jquery", "hub"], function($, hub) {

    $("#submit").click(function(){
        var text = $("#input").val();
        hub.publish("additem", text);
    });

});