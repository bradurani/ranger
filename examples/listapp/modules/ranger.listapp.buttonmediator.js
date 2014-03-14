Ranger.define("listapp.buttonmediator",["jquery"], function($) {
    this.messageHandler = function(data, topic) {
        switch(topic) {
            case "activate" + data:
                break;
            case "reset":
                break;
        }
    };
});