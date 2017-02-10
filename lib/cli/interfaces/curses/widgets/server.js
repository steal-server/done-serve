var assign = require("lodash.assign");
var Box = require("blessed").Box;
var helpers = require("../helpers");

function Server(options) {
	options = assign(options, {
		top: "0%",
		left: "0%",
		width: "40%",
		height: "20%",
		label: "server running",
		content: "",
		border: {
			type: "line"
		},
		style: {
			focus: {
				border: {
					fg: 'blue'
				}
			}
		}
	});

	Box.call(this, options);

	helpers.focusable(this);

	options.events.on("server", function(url){
		this.setContent(url);
		this.screen.render();
	}.bind(this));
}

Server.prototype.__proto__ = Box.prototype;
Server.prototype.type = 'server';

module.exports = Server;
