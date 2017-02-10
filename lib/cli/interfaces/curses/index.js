var blessed = require("blessed");
var npmUtils = require("steal/ext/npm-utils");
var helpers = require("./helpers");
var AccessBox = require("./widgets/access");
var IOBox = require("./widgets/io");
var ServerBox = require("./widgets/server");

function symbolTag(symbol, color){
	return "{" + color + "-fg}" + symbol + "{/" + color + "-fg}";
}

function check() {
	return symbolTag("✔", "green");
}

function ecks() {
	return symbolTag("✖", "red");
}

function recyc() {
	return symbolTag("♻️️", "yellow");
}

module.exports = function(events){
	var screen = blessed.screen({
		smartCSR: true
	});

	screen.title = "done-serve";

	var serverBox = new ServerBox({ events: events });

	var lrBox = blessed.log({
		scrollable: true,
		keys: true,
		alwaysScroll: true,
		tags: true,
		top: "0%",
		left: "40%",
		width: "60%",
		height: "20%",
		label: "live-reload",
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

	helpers.focusable(lrBox);
	helpers.scrollable(lrBox);

	var accessBox = new AccessBox({ events: events });
	var ioBox = new IOBox({ events: events });

	screen.key(['C-c', 'q'], function(ch, key) {
		screen.destroy();
		process.exit(0);
	});

	screen.append(serverBox);
	screen.append(lrBox);
	screen.append(accessBox);
	screen.append(ioBox);
	screen.render();

	handleLiveReload(lrBox, events);
};

function handleLiveReload(box, events) {
	var currentLine = 0;
	var cache = {};

	var isReloading = /Reloading (.+)/;
	var isError = /Error reloading (.+)/;

	function getModulePath(moduleName) {
		var parsed = npmUtils.moduleName.parse(moduleName);
		return parsed.modulePath;
	}

	events.on("live-reload", function(msg){
		var match, shortName;
		if(match = isReloading.exec(msg)) {
			shortName = getModulePath(match[1]);
			var line = currentLine;
			cache[shortName] = line;
			setTimeout(function(){
				if(cache[shortName] != null) {
					box.setLine(line, check() + " " + shortName);
					delete cache[shortName];
				}
			}, 500);
			box.insertLine(line, recyc() + " " + shortName);
			currentLine++;
		} else if(match = isError.exec(msg)) {
			shortName = getModulePath(match[1]);
			var line = cache[shortName];
			if(line) {
				box.setLine(line, ecks() + " " + shortName);
				delete cache[shortName];
			}
		} else {
			events.emit("log", msg);
		}
	});
}
