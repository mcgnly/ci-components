var window = require('./window');

var jsdom = require('jsdom');
global.document = jsdom.jsdom('');
global.window = window;
global.Blob = window.Blob;
global.self = global.window;
global.navigator = window.navigator;

global.window.URL.createObjectURL = function() {};

//SET BUILD CONFIG TO LOCAL
global.__LOCAL__ = true;
global.__PRODUCTION__ = false;
