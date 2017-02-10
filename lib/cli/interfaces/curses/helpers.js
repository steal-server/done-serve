exports.focusable = function(box) {
	box.on("click", function(){
		box.focus();
	});
};

exports.scrollable = function(box) {
	box.on("wheelup", function(){
		if(box.focused)
			box.scroll(-(box.height / 2 | 0) || -1);
	});

	box.on("wheeldown", function(){
		if(box.focused)
			box.scroll(box.height / 2 | 0 || 1);
	});
};
