'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = HumanReadableTimestamp;

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

function HumanReadableTimestamp(_ref) {
    var timestamp = _ref.timestamp;

    if (!timestamp) return _react2.default.createElement(
        'span',
        null,
        'No data have been sent'
    );
    return _react2.default.createElement(
        'span',
        null,
        'Last updated: ',
        humanReadableDiff(timestamp)
    );
};

HumanReadableTimestamp.propTypes = {
    timestamp: _react.PropTypes.instanceOf(Date)
};