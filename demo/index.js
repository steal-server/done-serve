var other = require("./other");

module.exports = function(){
	var div = document.createElement("div");
	div.textContent = "Hello world";
	document.body.appendChild(div);

	var script = document.createElement("script");
	script.setAttribute("src", "./node_modules/steal/steal.js");
	document.body.appendChild(script);
};
