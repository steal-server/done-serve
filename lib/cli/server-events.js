var EventEmitter = require('events').EventEmitter;

module.exports = function(){
	var events = new EventEmitter();

	events.liveReloadProcess = function(proc){
		// TODO stuff
	};

	pipeConsoleToEvents(events);

	return events;
};

function pipeConsoleToEvents(events){
	console.log = function(/* args */){
		var msges = [].slice.call(arguments).join(" ");
		events.emit("log", msges);
	};
	console.error = function(/* args */){
		var msges = [].slice.call(arguments).join(" ");
		events.emit("error", msges);
	};
}
