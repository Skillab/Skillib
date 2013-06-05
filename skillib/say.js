/* Say functionality */
skillib.register((function() {

	// Does the "say" action
	function say(text, target) {
		// If target is undefined, use a 
		if (target == undefined) {
			target = skillib.getConfig("say", "to");
		}
	
		// Convert target to always be an array
		if (typeof target === 'string') {
			target = [target];
		}
		
		target.map(function(t) {
			switch(t) {
				case "page":
					$(skillib.getConfig("say", "pageTo")).append(text + "<br />");
					break;
				case "console":
					console.log(text);
					break;
				case "alert":
					alert(text);
					break;
			}
		});
	};

	// Return the interface definition
	return {
		"name": "say",
		"methods": {
			"say": say,
			"saypage": function(text) {
				say(text, "page");
			},
			"sayconsole": function(text) {
				say(text, "console");
			},
			"sayalert": function(text) {
				say(text, "alert");
			}
		},
		"config": {
			"pageTo": "body",
			"to": "page"
		}
	};

})());