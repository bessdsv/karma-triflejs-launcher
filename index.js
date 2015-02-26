var fs = require('fs');
var path = require('path');

function serializeOption(value) {
	if (typeof value === 'function') {
		return value.toString();
	}
	return JSON.stringify(value);
}

var trifleDir = function () {
	//var trifleSource = require('triflejs').path;
	//return path.dirname( trifleSource );
  return path.join(__dirname, 'TrifleJS');
};

var trifleJSExePath = function () {
	return path.join(trifleDir(), 'TrifleJS.exe');
};

var isWindows = function () {
	return /^win/.test(process.platform);
};

var trifleJSBrowser = function(baseBrowserDecorator, config, args) {
	baseBrowserDecorator(this);

	var options = args && args.options || config && config.options || {};
	var flags = args && args.flags || config && config.flags || [];

	this._start = function(url) {
		// Create the js file that will open Karma
		var captureFile = path.join(this._tempDir, 'capture.js');
		var optionsCode = Object.keys(options).map(function (key) {
			if (key !== 'settings') { // settings cannot be overridden, it should be extended!
				return 'page.' + key + ' = ' + serializeOption(options[key]) + ';';
			}
		});

		if (options.settings) {
			optionsCode = optionsCode.concat(Object.keys(options.settings).map(function (key) {
				return 'page.settings.' + key + ' = ' + serializeOption(options.settings[key]) + ';';
			}));
		}

		var captureCode = 'var page = require("webpage").create();\n' +
						  optionsCode.join('\n') + '\npage.open("' + url + '");\n';
		fs.writeFileSync(captureFile, captureCode);

		flags = flags.concat(captureFile);

		// Start trifleJS
		this._execCommand(this._getCommand(), flags);
	};

};

trifleJSBrowser.prototype = {
	name: 'trifleJS',

	DEFAULT_CMD: {
		linux: require( 'triflejs' ).path,
		darwin: require( 'triflejs' ).path,
		win32: trifleJSExePath()
	},
	ENV_CMD: 'trifleJS_BIN'
};

trifleJSBrowser.$inject = ['baseBrowserDecorator', 'config.triflejsLauncher', 'args'];

// PUBLISH DI MODULE
module.exports = {'launcher:trifleJS': ['type', trifleJSBrowser]};
