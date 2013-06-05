/* Read functionality */
skillib.register((function() {

	// Does the "read" action
	function read(text, target) {
		// If target is undefined, use a 
		if (target == undefined) {
			target = skillib.getConfig("read", "from");
		}
	
		switch(target) {
			case "ready":
				alert(text);
				return;
			case "accept":
				return confirm(text);
			case "input":
				return prompt(text);
			case "question":
				var ret = prompt(text + "\n\nPlease choose (Y)es or (N)o");
				if (ret && (ret.toLowerCase() == "y" || ret.toLowerCase() == "yes" || ret.toLowerCase == "aye")) {
					return true;
				}
				return false;
		}
	};

	// Return the interface definition
	return {
		"name": "read",
		"methods": {
			"read": read,
			"ready": function(text) {
				return read(text, "ready");
			},
			"accept": function(text) {
				return read(text, "accept");
			},
			"question": function(text) {
				return read(text, "question");
			}
		},
		"config": {
			"from": "question"
		}
	};

})());