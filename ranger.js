var Ranger = function(window, debug, dependencies) {
    if(!(this instanceof Ranger)){
        return new Ranger(window, debug, dependencies);
    }
    this.window = window;
    this.debug = debug;
    this.console = this._getSafeConsole(this.window, this.debug);
    this.dependencies = dependencies;
};
Ranger.prototype = {
    load: function() {
        this.definitions = Ranger.definitions || [];
        this.modules = this._map(this.definitions, this._loadModule.bind(this));
        this._map(this.modules, this._initModule);
    },
    _map: function(array, func) {
        var ret = [];
        for(var item in array) {
            if(array.hasOwnProperty(item)) {
                ret.push(func(array[item]));
            }
        }
        return ret;
    },
    _loadModule: function(def) {
        this.console.log("Loading module: " + def.namespace);
        var module = this._construct(def.Constructor, new Ranger._Module(def.namespace), def.dependencies);
        return module;
    },
    _construct: function(Constructor, prototype, args) {
        var F = function(){
            return Constructor.apply(this, args);
        };
        if(prototype) {
            F.prototype = prototype;
        }
        return new F();
    },
    _initModule: function(module) {
        this.console.log("Initing module: " + module.toString());
    },
    _getSafeConsole: function(window, debug) {
        var console = window.console = window.console || {};
        var methods = ["assert","clear","count","debug","dir","dirxml","error","group","groupCollapsed","groupEnd","info",
            "log","profile","profileEnd","time","timeEnd","timeStamp","trace","warn"]; //https://developers.google.com/chrome-developer-tools/docs/console-api
        var count = methods.length;
        var stub = function(){};
        while(count--){
            if(!console[methods[count]] || !debug) {
                console[methods[count]] = stub;
            }
        }
        //our levels in Ruby are: DEBUG, INFO, EVENT, WARN, ERROR, FATAL
        console.fatal = console.error;
        console.event = console.info;
        return console;
    }
};
Ranger.define = function(namespace, dependencies, Constructor) {
    //TODO check inputs
    Ranger.definitions = Ranger.definitions || [];
    Ranger.definitions.push({ namespace: namespace, dependencies: dependencies, Constructor: Constructor});
};
Ranger._Module = function(namespace){
    this.toString = function(){ return namespace; };
    this.namespace = namespace;
};