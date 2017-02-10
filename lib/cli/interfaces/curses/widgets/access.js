var assign = require("lodash.assign");
var helpers = require("../helpers");
var Lined = require("./lined");

function AccessBox(options) {
	var options = assign(options, {
		eventName: "request",
		scrollable: true,
		keys: true,
		alwaysScroll: true,
		top: "20%",
		left: "0%",
		width: "100%",
		height: "30%",
		label: "access",
		border: {
			type: "line"
		},
		scrollbar: {
			ch: ' ',
			inverse: true
		},
		style: {
			focus: {
				border: {
					fg: 'blue'
				}
			}
		}
	});

	Lined.call(this, options);

	helpers.focusable(this);
	helpers.scrollable(this);
}

AccessBox.prototype.__proto__ = Lined.prototype;
AccessBox.prototype.type = 'access';

AccessBox.prototype.transform = function(req){
	var date = new Date();
	var fmt = pad(date.getMonth() + 1) + "/" + pad(date.getDate()) +"/" +
		pad(date.getFullYear()) + " " +
		pad(date.getHours()) + ":" + pad(date.getMinutes()) + ":" +
		pad(date.getSeconds());
	return "[" + fmt + "] " + req.method + " " + req.path;
};

function pad(str) {
	str = String(str);
	if(str.length === 1) str = "0" + str;
	return str;
}

module.exports = AccessBox;
