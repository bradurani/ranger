var Ajax = function($, console) {
	
	function get(url) {
		return $.get(url);

	}

	function post(url) {
		return $.get(url);
	}

	return {
		"get" : get,
		"post" : post
	};
};

var ActivateMediator = function($, console) {

	this.on("activate", messageHandler);
	this.on("reset", messageHandler);

	function messageHandler(data, topic) {
		switch(topic) {
			case "activate":
				break;
			case "reset":
				break;
		}
	};

};



var Ranger = function($, Promise, console, document, environment) {

	function init(modules) {
		var readyPromise = Promise.cast($(document).ready);
		readyPromise.then(function() {
			$(modules).forEach(function(Klass) {
				register(Klass);
			});
		}).catch(console.error);
	}

	function register(Klass){
		var module;

		//Module base class
		var Module = function(){};

		try {
			Klass.prototype = new Module();
			module = new Klass($, console);
			return module;
		} catch (e) {

		}
	}

	return { "init": init };
};

//Factory method
Ranger.app = function app(args, modules) {
	var app = new Ranger($, Promise, console, document, environment);
	app.init(modules);
	return app;
}