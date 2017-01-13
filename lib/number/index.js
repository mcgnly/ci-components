'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LiveWidget = require('../LiveWidget');

var _LiveWidget2 = _interopRequireDefault(_LiveWidget);

var _widgetSizes = require('../widgetSizes');

var _widgetSizes2 = _interopRequireDefault(_widgetSizes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function NumberWidget(props) {
    return _react2.default.createElement(
        'span',
        { className: 'mONumberWidget' },
        props.state.reading
    );
}

exports.default = (0, _LiveWidget2.default)(NumberWidget, _widgetSizes2.default.large);