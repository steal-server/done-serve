var assign = require("lodash.assign");
var helpers = require("../helpers");
var Lined = require("./lined");

function IOBox(options) {
	var options = assign(options, {
		eventName: "log",
		scrollable: true,
		keys: true,
		alwaysScroll: true,
		top: "50%",
		left: "0%",
		width: "100%",
		height: "50%",
		label: "input/output",
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

IOBox.prototype.__proto__ = Lined.prototype;
IOBox.prototype.type = 'io';

module.exports = IOBox;
