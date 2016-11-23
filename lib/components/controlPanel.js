"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var _ref$onRefresh = _ref.onRefresh,
        onRefresh = _ref$onRefresh === undefined ? function () {} : _ref$onRefresh;
    return _react2.default.createElement(
        "div",
        { className: "rSectionHeaderBreadcrumb" },
        _react2.default.createElement("div", null),
        _react2.default.createElement(
            "div",
            { className: "rSectionHeaderElement mWCControl" },
            _react2.default.createElement("i", { className: "fa fa-refresh mQaRefresh mWCControlItem", onClick: onRefresh })
        )
    );
};