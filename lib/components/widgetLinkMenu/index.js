'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = WidgetLinkMenu;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _buttonOnly = require('./buttonOnly');

var _buttonOnly2 = _interopRequireDefault(_buttonOnly);

var _dropdown = require('./dropdown');

var _dropdown2 = _interopRequireDefault(_dropdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function WidgetLinkMenu(props) {
    var links = props.links;

    if (!links || links.length == 0) {
        return null;
    } else if (links.length === 1) {
        return _react2.default.createElement(_buttonOnly2.default, { link: links[0] });
    } else {
        return _react2.default.createElement(_dropdown2.default, props);
    }
};

var LINK_SHAPE = _react2.default.PropTypes.shape({
    name: _react2.default.PropTypes.string.isRequired,
    address: _react2.default.PropTypes.string.isRequired
});

WidgetLinkMenu.propTypes = {
    links: _react2.default.PropTypes.arrayOf(LINK_SHAPE).isRequired
};