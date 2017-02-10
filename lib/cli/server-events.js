var EventEmitter = require('events').EventEmitter;
var util = require("util");

function ServerEmitter(){
	EventEmitter.call(this);

	this.console = {
		log: console.log.bind(console),
		warn: console.warn.bind(console),
		error: console.error.bind(console)
	};
}

util.inherits(ServerEmitter, EventEmitter);

ServerEmitter.prototype.handleLiveReload = function(proc){
	proc.stdout.setEncoding("utf8");
	proc.stderr.setEncoding("utf8");

	var sendAsLiveReloadEvent = function(msg){
		this.emit("live-reload", msg);
	}.bind(this);

	proc.stderr.on("data", sendAsLiveReloadEvent);
	proc.stdout.on("data", sendAsLiveReloadEvent);
};

module.exports = function(){
	var events = new ServerEmitter();
	pipeConsoleToEvents(events);
	return events;
};

function pipeConsoleToEvents(events){
	console.log = function(/* args */){
		events.emit("log", arguments);
	};
	console.error = function(/* args */){
		events.emit("error", arguments);
	};
}
