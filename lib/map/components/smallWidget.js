'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _header = require('../../components/header');

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (props) {
    var children = props.children,
        type = props.type;

    return _react2.default.createElement(
        'li',
        { className: 'rBox rUtilityResetListItem mOFullWidget', 'data-qai-widget-type': type },
        _react2.default.createElement(_header2.default, props),
        _react2.default.createElement(
            'div',
            { className: 'rBoxBody mCMapSmall' },
            children
        )
    );
};