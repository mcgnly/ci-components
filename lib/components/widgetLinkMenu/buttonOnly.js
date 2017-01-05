"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = WidgetLinkMenuButtonOnly;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function WidgetLinkMenuButtonOnly(props) {
    return _react2.default.createElement(
        "div",
        { className: "rDropdownMenu mWCLinkMenu" },
        _react2.default.createElement(
            "a",
            { href: props.link.address },
            _react2.default.createElement(
                "button",
                {
                    className: "rButton rDropdownMenuButton rDropdownMenuButtonNoCaret"
                },
                "GO TO \u201C",
                props.link.name,
                "\u201D"
            )
        )
    );
};