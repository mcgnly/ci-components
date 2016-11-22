'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _listItem = require('./listItem');

var _listItem2 = _interopRequireDefault(_listItem);

var _statusAlert = require('./statusAlert');

var _statusAlert2 = _interopRequireDefault(_statusAlert);

var _header = require('../../components/header');

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
    var statuses = props.statuses,
        onLinkClick = props.onLinkClick,
        overAllStatus = props.overAllStatus;

    return _react2.default.createElement(
        'li',
        { className: 'rBox mOWidgetBox mOFullWidget' },
        _react2.default.createElement(
            'table',
            { className: 'rTable' },
            _react2.default.createElement(
                'thead',
                { className: 'rTableHeader' },
                _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                        'th',
                        { className: 'rTableCell' },
                        'Devices overview'
                    ),
                    _react2.default.createElement('th', { className: 'rTableCell' }),
                    _react2.default.createElement('th', { className: 'rTableCell' })
                )
            ),
            _react2.default.createElement(
                'tbody',
                null,
                statuses.map(function (status, i) {
                    return _react2.default.createElement(_listItem2.default, _extends({ key: 'health-monitor-item-' + i }, status, { onClick: function onClick() {
                            return onLinkClick(status.status);
                        }, status: status.status }));
                })
            )
        ),
        _react2.default.createElement(_statusAlert2.default, { status: overAllStatus })
    );
};