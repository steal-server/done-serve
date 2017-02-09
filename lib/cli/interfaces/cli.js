
module.exports = function(events){
	events.on("log", function(msg){
		console.log(msg);
	});
	events.on("error", function(err){
		console.log(err);
	});
	events.on("server", function(url){
		console.log("done-serve starting on " + url);
	});
};
