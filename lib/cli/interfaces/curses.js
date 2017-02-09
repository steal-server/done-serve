var blessed = require("blessed");

function makeFocusable(box) {
	box.on("click", function(){
		box.focus();
	});
}

function makeScrollable(box) {
	box.on("wheelup", function(){
		if(box.focused)
			box.scroll(-(box.height / 2 | 0) || -1);
	});

	box.on("wheeldown", function(){
		if(box.focused)
			box.scroll(box.height / 2 | 0 || 1);
	});
}

module.exports = function(events){
	var check = "✔";
	var ecks = "✖";
	var recyc = "♻️️";

	var screen = blessed.screen({
		smartCSR: true
	});

	screen.title = "done-serve";

	var serverBox = blessed.box({
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
	makeFocusable(serverBox);

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

	makeFocusable(lrBox);
	makeScrollable(lrBox);

	var accessBox = blessed.log({
		scrollable: true,
		keys: true,
		alwaysScroll: true,
		top: "20%",
		left: "0%",
		width: "100%",
		label: "access",
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

	makeFocusable(accessBox);
	makeScrollable(accessBox);

	screen.key(['C-c', 'q'], function(ch, key) {
		screen.destroy();
		process.exit(0);
	});

	screen.append(serverBox);
	screen.append(lrBox);
	screen.append(accessBox);
	screen.render();

	lrBox.insertLine(0, "{green-fg}" + check + "{/green-fg} Reloaded: index.stache");
	lrBox.insertLine(1, "{red-fg}" + ecks + "{/red-fg} Error: index.stache");
	lrBox.insertLine(2, "{green-fg}" + check + "{/green-fg} Reloaded: index.stache");
	lrBox.insertLine(3, "{red-fg}" + ecks + "{/red-fg} Error: index.stache");
	lrBox.insertLine(4, "{green-fg}" + check + "{/green-fg} Reloaded: index.stache");
	lrBox.insertLine(5, "{red-fg}" + ecks + "{/red-fg} Error: index.stache");
	lrBox.insertLine(6, "{green-fg}" + check + "{/green-fg} Reloaded: index.stache");
	lrBox.insertLine(7, "{red-fg}" + ecks + "{/red-fg} Error: index.stache");
	lrBox.insertLine(8, "{green-fg}" + check + "{/green-fg} Reloaded: index.stache");
	lrBox.insertLine(9, "{red-fg}" + ecks + "{/red-fg} Error: index.stache");
	lrBox.insertLine(10, "{green-fg}" + check + "{/green-fg} Reloaded: models/messages");
	lrBox.insertLine(11, "{red-fg}" + ecks + "{/red-fg} Error: app");

	events.on("server", function(url){
		serverBox.setContent(url);
		screen.render();
	});
};
