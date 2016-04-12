var assert = require("assert");
var cli = require("../lib/cli");
var EventEmitter = require("events").EventEmitter;
var td = require("testdouble");

function node(args){
	return ["node", __filename].concat(args);
}

function serverExpects(opts){
	var server = td.replace("../lib/index");
	td.when(server(td.matchers.contains(opts)))
		.thenReturn({
			listen: function(){
				assert.ok("it worked");
				return new EventEmitter();
			}
		});
}

describe("done-serve cli", function(){
	describe("--timeout", function(){
		it("Passes undefined when no option passed", function(){
			cli.program.parse(node([]));
			serverExpects({ timeout: undefined });
			cli.run();
		});

		it("Passes in an integer", function(){
			cli.program.parse(node([
				"--timeout",
				"4000",
				"--no-live-reload"
			]));

			serverExpects({ timeout: 4000 });
			cli.run();
		});
	});

	describe("--debug", function(){
		it("Passes true", function(){
			cli.program.parse(node(["--debug"]));
			serverExpects({ debug: true });
			cli.run();
		});
	});
});
