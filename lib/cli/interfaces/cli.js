
module.exports = function(events){
	events.on("log", function(msg){
		events.console.log(msg);
	});
	events.on("error", function(err){
		events.console.log(err);
	});
	events.on("live-reload", function(msg){
		events.console.error(msg);
	});
	events.on("server", function(url){
		events.console.log("done-serve starting on " + url);
	});
};
