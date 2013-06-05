/* The core skillib that binds it all together */
var skillib = (function() {

	// Stores the configuration values for all of the modules
	var configuration = {};
	
	// Public config options that can be set
	var config = {};

	// Functions that the user can call
	var call = {};
	
	// Store up the old values that are replaced
	var oldGlobals = {};
	
	// Registers an interface for use in skillib
	function register(iface) {
		
		if (configuration.hasOwnProperty(iface.name)) {
			console.error("Iface name", iface.name, "already found, rejecting", configuration);
			return;
		}
		
		configuration[iface.name] = {};
		config[iface.name] = {};
		for (var k in iface.config) {
			configuration[iface.name][k] = iface.config[k];
			
			config[iface.name][k] = (function(name, index) {
				return function(value) {
					configuration[name][index] = value;
				};
			})(iface.name, k);
		}
		
		for (var k in iface.methods) {
			if (call.hasOwnProperty(k)) {
				console.error("Method", k, "rejected, already exists", call);
				continue;
			}
			call[k] = iface.methods[k];
			
			oldGlobals[k] = window[k];
			window[k] = iface.methods[k];
		}
	};

	// Returns a configuration property
	function getConfig(module, parameter) {
		if (configuration.hasOwnProperty(module)) {
			var conf = configuration[module];
			if (conf.hasOwnProperty(parameter)) {
				return conf[parameter];
			}
		}
		return false;
	};
	
	// Return the public interface
	return {
		call: call,
		config: config,
		register: register,
		getConfig: getConfig
	};

})();