'use strict';
const jsdom = require('jsdom');

function restore() {
    const window = jsdom.jsdom(undefined, {
        virtualConsole: jsdom.createVirtualConsole().sendTo(console)
    }).defaultView;
    Object.assign(module.exports, window);

    return window;
}

module.exports = restore();
