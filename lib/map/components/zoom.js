"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var onZoomIn = _ref.onZoomIn,
        onZoomOut = _ref.onZoomOut;

    return _react2.default.createElement(
        "div",
        { className: "mCMapZoom" },
        _react2.default.createElement(
            "button",
            { className: "mCMapZoomButton", onClick: onZoomIn },
            "+"
        ),
        _react2.default.createElement(
            "button",
            { className: "mCMapZoomButton", onClick: onZoomOut },
            "-"
        )
    );
};