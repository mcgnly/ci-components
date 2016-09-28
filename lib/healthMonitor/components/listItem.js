'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _statusSymbol = require('./statusSymbol');

var _statusSymbol2 = _interopRequireDefault(_statusSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var count = _ref.count;
    var status = _ref.status;
    var onClick = _ref.onClick;

    return _react2.default.createElement(
        'tr',
        { className: 'mCWidgetHealthMonitorRow' },
        _react2.default.createElement(
            'td',
            { className: 'rTableCell rTableCellWide' },
            _react2.default.createElement(_statusSymbol2.default, { status: status }),
            ' Devices ',
            status
        ),
        _react2.default.createElement(
            'td',
            { className: 'rTableCell rTableCellCenter' },
            count,
            ' Devices'
        ),
        _react2.default.createElement('td', { className: 'rTableCell rTableCellWide mCWidgetHealthLink', onClick: onClick })
    );
};