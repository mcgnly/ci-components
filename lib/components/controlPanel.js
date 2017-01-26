"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ControlPanel;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

ControlPanel.propTypes = {
    onRefresh: _react.PropTypes.func,
    onAdd: _react.PropTypes.func,
    onRemove: _react.PropTypes.func
};

function ControlPanel(_ref) {
    var _ref$onRefresh = _ref.onRefresh,
        onRefresh = _ref$onRefresh === undefined ? function () {} : _ref$onRefresh,
        _ref$onAdd = _ref.onAdd,
        onAdd = _ref$onAdd === undefined ? function () {} : _ref$onAdd;

    return _react2.default.createElement(
        "div",
        { className: "rSectionHeaderBreadcrumb" },
        _react2.default.createElement("div", null),
        _react2.default.createElement(
            "div",
            { className: "rSectionHeaderElement mWCControl" },
            _react2.default.createElement("i", { className: "fa fa-refresh mQaControlPanelRefresh mWCControlItem", onClick: onRefresh }),
            _react2.default.createElement("i", { className: "fa fa-plus mQaControlPanelAdd mWCControlItem", onClick: onAdd })
        )
    );
};