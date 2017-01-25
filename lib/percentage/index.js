'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LiveWidget = require('../LiveWidget.js');

var _LiveWidget2 = _interopRequireDefault(_LiveWidget);

var _relayrSensorIllustrations = require('relayr-sensor-illustrations');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PercentageWidget = function (_React$Component) {
    _inherits(PercentageWidget, _React$Component);

    function PercentageWidget() {
        _classCallCheck(this, PercentageWidget);

        return _possibleConstructorReturn(this, (PercentageWidget.__proto__ || Object.getPrototypeOf(PercentageWidget)).apply(this, arguments));
    }

    _createClass(PercentageWidget, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                state = _props.state,
                title = _props.title;

            return _react2.default.createElement(
                'div',
                { className: 'mOWidgetSimpleText' },
                _react2.default.createElement(_relayrSensorIllustrations.Percentage, { value: state.reading, min: 0, max: 100, title: title })
            );
        }
    }]);

    return PercentageWidget;
}(_react2.default.Component);

exports.default = (0, _LiveWidget2.default)(PercentageWidget);