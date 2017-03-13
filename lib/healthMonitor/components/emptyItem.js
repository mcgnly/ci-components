"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = EmtpyItem;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function EmtpyItem(_ref) {
    var onClick = _ref.onClick;

    return _react2.default.createElement(
        "tr",
        { className: "mCWidgetHealthMonitorRow", onClick: onClick },
        _react2.default.createElement(
            "td",
            { className: "rTableCell", colSpan: "2" },
            "No device statuses was found"
        ),
        _react2.default.createElement("td", { className: "rTableCell rTableCellWide mCWidgetHealthLink" })
    );
};

EmtpyItem.propTypes = {
    onClick: _react.PropTypes.func.isRequired
};