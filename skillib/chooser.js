/* Chooser functionality */
skillib.register((function() {

	// Starts a chooser
	function chooser(options, changefn) {
		var identifier = (Math.random() * 1000000000000000) + "";
		var container = $("<div>");
		options.map(function(o) {
			container.append('<input type="radio" name="' + identifier + '" value="' + o + '"> ' + o + '<br />');
		});
		$(skillib.getConfig("chooser", "to")).append(container);
		
		var iface = {
			value: false,
			change: changefn || function() {},
			remove: function() { container.remove(); }
		};
		
		container.find('input[type="radio"]').on("change", function(e) {
			iface.value = e.target.value;
			iface.change(iface.value);
		});
		
		return iface;
	};

	// Return the interface definition
	return {
		"name": "chooser",
		"methods": {
			"chooser": chooser
		},
		"config": {
			"to": "body"
		}
	};

})());