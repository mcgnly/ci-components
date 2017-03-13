'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Status;

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

function Status(_ref) {
    var status = _ref.status;

    return _react2.default.createElement(
        'div',
        { className: 'mCWidgetHealthAlerts ' + getClass(status) },
        'Devices ',
        status
    );
};

Status.propTypes = {
    status: _react.PropTypes.oneOf(['online', 'offline', 'outage', 'inactive']).isRequired
};