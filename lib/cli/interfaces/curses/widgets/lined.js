var Log = require("blessed").Log;

function Lined(options) {
	var events = options.events;

	var currentLine = 0;

	events.on(options.eventName, function(result){
		var message = this.transform(result);

		this.insertLine(currentLine, message);
		currentLine++;
	}.bind(this));

	Log.call(this, options);
}

Lined.prototype.__proto__ = Log.prototype;
Lined.prototype.type = 'lined';

Lined.prototype.transform = function(msg){
	return msg;
};

module.exports = Lined;
