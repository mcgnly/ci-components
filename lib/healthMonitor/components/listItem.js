'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ListItem;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _statusSymbol = require('./statusSymbol');

var _statusSymbol2 = _interopRequireDefault(_statusSymbol);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ListItem(_ref) {
    var count = _ref.count,
        status = _ref.status,
        onClick = _ref.onClick;

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

ListItem.propTypes = {
    count: _react.PropTypes.number.isRequired,
    status: _react.PropTypes.oneOf(['online', 'offline', 'outage', 'inactive']).isRequired,
    onClick: _react.PropTypes.func.isRequired
};