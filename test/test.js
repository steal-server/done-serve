var mochas = require("spawn-mochas");

var tests = [
	"server_test.js",
	"cookie_server_test.js",
	"can-serve_test.js"
].map(function(pth){
	return __dirname + "/" + pth;
});

mochas(tests);
