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
        case 'inactive':
            return 'mCWidgetHealthStatusInactive';
        case 'offline':
            return 'mCWidgetHealthStatusFailure';
        case 'outage':
            return 'mCWidgetHealthStatusWarning';
        case 'online':
            return 'mCWidgetHealthStatusSuccess';
        default:
            return 'mCWidgetHealthStatusInactive';
    }
};

exports.default = function (_ref) {
    var status = _ref.status,
        children = _ref.children;

    return _react2.default.createElement(
        'span',
        { className: 'mCWidgetHealthStatus ' + getClass(status) },
        children
    );
};