'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _redirectUrlFactory = require('./redirectUrlFactory');

var _redirectUrlFactory2 = _interopRequireDefault(_redirectUrlFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
    redirect: function redirect(type, config, redirectMethod) {
        redirectMethod(_redirectUrlFactory2.default[type](config));
    }
};