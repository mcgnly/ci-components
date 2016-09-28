'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getClass(status) {
    var st = status ? status.toLowerCase() : status;
    switch (st) {
        case 'offline':
            return 'mCWidgetHealthAlertsFailure';
        case 'outage':
            return 'mCWidgetHealthAlertsWarning';
        default:
            return 'mCWidgetHealthAlertHidden';
    }
};

exports.default = function (_ref) {
    var status = _ref.status;

    return _react2.default.createElement(
        'div',
        { className: 'mCWidgetHealthAlerts ' + getClass(status) },
        'Devices ',
        status
    );
};