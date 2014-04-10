//test
(function(window) {

    var Ranger = function(dependencyMap, debug) {
        if(!(this instanceof Ranger)){
            return new Ranger(dependencyMap, debug);
        }
        this.debug = !!debug;
        this.dependencyMap = dependencyMap;
        this.modules = [];
    };

    Ranger.prototype = {
        load: function() {
            this.moduleDefinitions = Ranger.moduleDefinitions || []; //protect against no modules registered
            this.dependencyMap.debug = this.debug;
            this._loadHelpers();
            this._loadModules();
        },
        _loadHelpers: function(){
            this.helperDefinitions = Ranger.helperDefinitions || []; //protect against no helpers registered
            this._forEach(this.helperDefinitions, function(def) {
                this.dependencyMap[def.name] = def;
            }.bind(this));
        },
        _loadModules: function() {
            this._forEach(this.moduleDefinitions, function(mod) {
                var module = this._loadModule(mod);
                this.modules.push(module);
            }.bind(this));
        },
        _loadModule: function(def) {
            var dependencies = this._getDependencyObjects(def.dependencies);
            var proto = new Module(def.namespace);
            var module = this._constructObject(def.Constructor, proto, dependencies, true);
            this._setDependencyModuleBackRefs(module, module.dependencies);
            return module;
        },
        _getDependencyObjects: function(dependencyNames) {
            return this._map(dependencyNames, function(name) {
                if(!(name in this.dependencyMap)) {
                    throw new Error("Dependency: " + name + " not found");
                }
                var dep = this.dependencyMap[name];
                if(dep.HelperConstructor && typeof dep.HelperConstructor === "function") { //if it's a helper, instantiate a new one
                    var subDeps = this._getDependencyObjects(dep.dependencies);
                    dep = this._constructObject(dep.HelperConstructor,
                                                new Helper(dep.name),
                                                subDeps); //could create an infinite loop
                }
                return dep;
            }.bind(this));
        },
        _constructObject: function(constructor, proto, args) {
            var RangerObject = function(){
                return constructor.apply(this, args);
            };
            if(proto) {
                RangerObject.prototype = proto;
            }
            var o =  new RangerObject();
            o.dependencies = args;
            return o;
        },
        _setDependencyModuleBackRefs: function(module, dependencies) {
            this._forEach(dependencies, function(dep){
                if(dep instanceof Helper) {
                    dep.moduleBackRef = module;
                    if(dep.dependencies) {
                     this._setDependencyModuleBackRefs(module, dep.dependencies);
                    }
                }
            }.bind(this));
        },
        _forEach: function(array, func) {
            for(var item in array) {
                if(array.hasOwnProperty(item)) {
                    func(array[item]);
                }
            }
        },
        _map: function(array, func) {
            var ret = [];
            this._forEach(array, function(i) {
                ret.push(func(i));
            }.bind(this));
            return ret;
        }
    };

    Ranger.define = function(namespace, dependencies, Constructor) {
        //TODO check inputs
        Ranger.moduleDefinitions = Ranger.moduleDefinitions || [];
        Ranger.moduleDefinitions.push({ namespace: namespace, dependencies: dependencies, Constructor: Constructor});
    };

    Ranger.defineHelper = function(name, dependencies, Constructor) {
        //TODO check inputs
        Ranger.helperDefinitions = Ranger.helperDefinitions || [];
        Ranger.helperDefinitions.push({ name: name, dependencies: dependencies, HelperConstructor: Constructor });
    };
    Ranger.getHelperTestObject = function(name){
        var C;
        Ranger.prototype._forEach(Ranger.helperDefinitions, function(obj) {
            if(obj.name === name) {
                C = obj.HelperConstructor;
            }
        });
        return Ranger.prototype._constructObject(C, new Helper(name), arguments[1]);
    }
    //prototype for modules
    var Module = function(namespace){
        this.namespace = namespace;
        this.toString = function(){ return "Ranger Module: " + namespace; };
    };

    var Helper = function(name) {
        this.name = name;
        this.toString = function(){ return "Ranger Helper: " + name; };
    };

    window.Ranger = Ranger;

})(window);