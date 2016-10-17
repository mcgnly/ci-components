'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _smallWidget = require('./components/smallWidget');

var _smallWidget2 = _interopRequireDefault(_smallWidget);

var _overview = require('./containers/overview');

var _overview2 = _interopRequireDefault(_overview);

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

var _config = require('./config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MapContainer = function (_React$Component) {
    _inherits(MapContainer, _React$Component);

    function MapContainer(props) {
        _classCallCheck(this, MapContainer);

        var _this = _possibleConstructorReturn(this, (MapContainer.__proto__ || Object.getPrototypeOf(MapContainer)).call(this, props));

        var devices = _this.props.devices;

        _this.service = new _service2.default(devices);
        return _this;
    }

    _createClass(MapContainer, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                _smallWidget2.default,
                this.props,
                _react2.default.createElement(_overview2.default, _extends({}, this.props, { hasControlPanel: false, height: _config.smallConfig.height, service: this.service, onPopupClick: function onPopupClick() {} }))
            );
        }
    }]);

    return MapContainer;
}(_react2.default.Component);

exports.default = MapContainer;