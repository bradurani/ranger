/*
    This has the intended side-effect of
    creating stubs for console and all of its methods
    in browsers that don't support console (IE 7 and earlier)
*/
Ranger.defineHelper("console", ["debug", "window"], function(debug, window) {

    //https://developers.google.com/chrome-developer-tools/docs/console-api
    var methods = ["assert","clear","count","dir","dirxml","group","groupCollapsed","groupEnd",
        "profile","profileEnd","time","timeEnd","timeStamp","trace"];
    var outputMethods = ["debug","error","info","log","warn"];

    this._addMethods = function(methods) {
        var count = methods.length;
        while(count--){
            var methodName = methods[count];
            this[methodName] = console[methodName] ? console[methodName].bind(console) : stub ;
        }
    };

    this._addOutputMethods = function(methods) {
        var count = methods.length;
        while(count--){
            var methodName = methods[count];
            if(console[methodName] && debug) {
                this[methodName] = function() {
                    var args = [].slice.call(arguments);
                    if(typeof arguments[0] === "string" && this.moduleBackRef) {
                        var newString = this.moduleBackRef.namespace + " " + args[0];
                        args[0] = newString;
                    }
                    console[methodName].apply(console, args);
                }.bind(this);
            } else {
                this[methodName] = stub;
            }
        }
    };


    var console = window.console || {};
    var stub = function(){};
    this._addMethods(methods);
    this._addOutputMethods(outputMethods);
    //our levels in Ruby are: DEBUG, INFO, EVENT, WARN, ERROR, FATAL

    this.fatal = console.fatal = function(msg ) { console.error(msg); };
    this.event = console.event = function(msg) { console.info(msg); };
});