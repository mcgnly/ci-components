import jsdom from 'jsdom';

global.document = jsdom.jsdom('');
global.window = document.defaultView;
global.navigator = window.navigator;

//SET BUILD CONFIG TO LOCAL
global.__LOCAL__ = true;
global.__PRODUCTION__ = false;
