Ranger.define("ajax", ["jquery", "promise"], function($, Promise) {

    this.get = function(url) {
        return Promise.cast($.get(url));
    };

    this.post = function(url) {
        return Promise.cast($.post(url));
    };
});