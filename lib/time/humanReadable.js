'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function humanReadableDiff(timestamp) {
    if (!timestamp) {
        return '';
    }
    var diff = timestamp.getTime() - new Date().getTime();
    return _moment2.default.duration(diff).humanize(true);
};

exports.default = function (_ref) {
    var timestamp = _ref.timestamp;

    return _react2.default.createElement(
        'div',
        null,
        humanReadableDiff(timestamp)
    );
};