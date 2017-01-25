'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _overview = require('./containers/overview');

var _overview2 = _interopRequireDefault(_overview);

var _history = require('./containers/history');

var _history2 = _interopRequireDefault(_history);

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

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

        _this.state = {
            type: 'overview',
            service: new _service2.default(devices)
        };

        _this.onShowHistoryClick = _this.onShowHistoryClick.bind(_this);
        _this.onHistoryClose = _this.onHistoryClose.bind(_this);
        return _this;
    }

    _createClass(MapContainer, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var newDevices = nextProps.devices;
            var oldDevices = this.props.devices;

            if (JSON.stringify(newDevices) !== JSON.stringify(oldDevices)) {
                this.setState({
                    service: new _service2.default(newDevices)
                });
            }
        }
    }, {
        key: 'onShowHistoryClick',
        value: function onShowHistoryClick(selectedDeviceId) {
            this.setState({
                type: 'history',
                historyDeviceId: selectedDeviceId
            });
        }
    }, {
        key: 'onHistoryClose',
        value: function onHistoryClose() {
            this.setState({ type: 'overview' });
        }
    }, {
        key: 'render',
        value: function render() {
            if (this.state.type === 'history') {
                var historyDeviceId = this.state.historyDeviceId;

                return _react2.default.createElement(_history2.default, _extends({}, this.props, { deviceID: historyDeviceId, service: this.state.service, onCloseClick: this.onHistoryClose }));
            } else {
                return _react2.default.createElement(_overview2.default, _extends({}, this.props, { service: this.state.service, featureInstruction: 'Show history', onPopupClick: this.onShowHistoryClick }));
            }
        }
    }]);

    return MapContainer;
}(_react2.default.Component);

exports.default = MapContainer;