var spawn = require("cross-spawn-async");
var path = require("path");
var mochaPath = path.join(path.dirname(require.resolve("mocha")),
						  "bin", "mocha");

var tests = [
	"server_test.js",
	"cookie_server_test.js",
	"can-serve_test.js"
];

runTests(tests);

function runTests(tests) {
	var pth = path.join(__dirname, tests.shift());
	var child = spawn("node", [mochaPath, pth], {
		stdio: "inherit"
	});
	child.on("exit", function(code){
		if(code !== 0) {
			process.exit(code);
		} else if(tests.length) {
			runTests(tests);
		} else {
			process.exit(code);
		}
	});
}
