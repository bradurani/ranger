Ranger.define("listapp.listmediator", ["jquery"], function($) {
    this.messageHandler = function(data, topic) {
        switch(topic) {
            case "activate":
                break;
            case "reset":
                break;
        }
    };
});