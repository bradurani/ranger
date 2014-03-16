/*
    This has the intended side-effect of
    creating stubs for console and all of its methods
    in browsers that don't support console (IE 7 and earlier)
*/
Ranger.defineHelper("console", ["debug", "window"], function(debug, window) {

    var methods = ["assert","clear","count","debug","dir","dirxml","error","group","groupCollapsed","groupEnd","info",
        "log","profile","profileEnd","time","timeEnd","timeStamp","trace","warn"]; //https://developers.google.com/chrome-developer-tools/docs/console-api

    var console = window.console || {};
    var count = methods.length;
    var stub = function(){};
    while(count--){
        var methodName = methods[count];
        this[methodName] = console[methodName] ? console[methodName].bind(console) : stub;
    }
    //our levels in Ruby are: DEBUG, INFO, EVENT, WARN, ERROR, FATAL
    this.fatal = console.fatal = function(msg ) { console.error(msg); };
    this.event = console.event = function(msg) { console.info(msg); };
});