var path = require('path');

var compression = require('compression');
var express = require('express');

var middleware = require("done-ssr-middleware");
var proxy = require('./proxy');

module.exports = function (options) {
	var app = express()
		.use(compression());

	if (options.configure) {
		options.configure(app);
	}

	if (options.proxy) {
		proxy(app, options);
	}

	app.use(express.static(path.join(options.path)));

	if(!options.static) {
		var system = {
			config: path.join(options.path, 'package.json') + '!npm',
			liveReload: options.liveReload
		};

		if(options.main) {
			system.main = options.main;
		}

		if(process.env.NODE_ENV !== "production") {
			app.use(function(req, res, next){
				options.events.emit("request", req);
				next();
			});
		}

		app.use(middleware(system, options));
	}

	return app;
};
