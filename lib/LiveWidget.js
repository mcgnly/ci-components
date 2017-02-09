'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mqtt = require('./service/mqtt.js');

var _mqtt2 = _interopRequireDefault(_mqtt);

var _header = require('./components/header');

var _header2 = _interopRequireDefault(_header);

var _widgetSizes = require('./widgetSizes');

var _widgetSizes2 = _interopRequireDefault(_widgetSizes);

var _widgetLinkMenu = require('./components/widgetLinkMenu');

var _widgetLinkMenu2 = _interopRequireDefault(_widgetLinkMenu);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WidgetPropType = {
    id: _react.PropTypes.number,
    type: _react.PropTypes.string,
    version: _react.PropTypes.string,
    config: _react.PropTypes.shape({
        readings: _react.PropTypes.arrayOf(_react.PropTypes.shape({
            path: _react.PropTypes.string,
            meaning: _react.PropTypes.string,
            id: _react.PropTypes.string,
            valueSchema: _react.PropTypes.object
        })),
        links: _react.PropTypes.arrayOf(_react.PropTypes.shape({
            address: _react.PropTypes.string,
            name: _react.PropTypes.string
        })),
        min: _react.PropTypes.number,
        max: _react.PropTypes.number,
        unit: _react.PropTypes.string
    }),
    title: _react.PropTypes.string,
    query: _react.PropTypes.shape({
        deviceIds: _react.PropTypes.arrayOf(_react.PropTypes.string),
        deviceDescription: _react.PropTypes.string,
        deviceName: _react.PropTypes.string,
        firmwareVersion: _react.PropTypes.string
    }),
    results: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        id: _react.PropTypes.string,
        owner: _react.PropTypes.string,
        name: _react.PropTypes.string,
        modelId: _react.PropTypes.string
    }))
};

exports.default = function (ComposedComponent) {
    var widgetSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _widgetSizes2.default.small;

    return function (_React$Component) {
        _inherits(LiveWidget, _React$Component);

        function LiveWidget(props) {
            _classCallCheck(this, LiveWidget);

            var _this = _possibleConstructorReturn(this, (LiveWidget.__proto__ || Object.getPrototypeOf(LiveWidget)).call(this, props));

            var _props$readings = props.readings,
                readings = _props$readings === undefined ? [] : _props$readings,
                _props$devices = props.devices,
                devices = _props$devices === undefined ? [] : _props$devices;


            _this.state = {
                reading: 0
            };

            _this.services = [];
            devices.forEach(function (_ref) {
                var id = _ref.id;

                _this.services = _this.services.concat(readings.map(function (_ref2) {
                    var meaning = _ref2.meaning,
                        path = _ref2.path;
                    return new _mqtt2.default({
                        id: id,
                        meaning: meaning,
                        path: path,
                        onMessage: function onMessage(_ref3) {
                            var value = _ref3.value,
                                lastMessage = _ref3.lastMessage;

                            _this.setState({ reading: value, lastMessage: lastMessage });
                        }
                    });
                }));
            });
            return _this;
        }

        _createClass(LiveWidget, [{
            key: 'componentDidMount',
            value: function componentDidMount() {
                var _this2 = this;

                this.currentTimeInterval = setInterval(function () {
                    _this2.setState({ currentTime: new Date() });
                }, 1000);

                this.services.map(function (service) {
                    if (service.connect) {
                        service.connect();
                    }
                });
            }
        }, {
            key: 'componentWillUnmount',
            value: function componentWillUnmount() {
                this.services.map(function (service) {
                    service.disconnect();
                });

                clearInterval(this.currentTimeInterval);
            }
        }, {
            key: 'render',
            value: function render() {
                var lastMessage = this.state.lastMessage;
                var _props = this.props,
                    _props$readings2 = _props.readings,
                    readings = _props$readings2 === undefined ? [] : _props$readings2,
                    _props$widget = _props.widget,
                    widget = _props$widget === undefined ? {} : _props$widget;

                var hasLinks = 'config' in widget && 'links' in widget.config && this.props.widget.config.links.length > 0;

                var firstReading = readings[0] || {};

                var _ref4 = firstReading.valueSchema || {},
                    min = _ref4.minimum,
                    max = _ref4.maximum,
                    unit = _ref4.unit;

                return _react2.default.createElement(
                    'li',
                    { className: 'rBox rUtilityResetListItem mOWidgetBox' },
                    _react2.default.createElement(_header2.default, _extends({}, this.props, { lastMessage: lastMessage })),
                    _react2.default.createElement(
                        'div',
                        { className: 'rBoxBody mOWidgetBoxBody' },
                        _react2.default.createElement(
                            'div',
                            { className: widgetSize.wrappingClass },
                            _react2.default.createElement(ComposedComponent, _extends({}, this.props, { state: this.state, min: min, max: max, unit: unit }))
                        ),
                        hasLinks && _react2.default.createElement(_widgetLinkMenu2.default, { links: this.props.widget.config.links })
                    )
                );
            }
        }]);

        return LiveWidget;
    }(_react2.default.Component);

    LiveWidget.propTypes = {
        type: _react.PropTypes.string,
        title: _react.PropTypes.string,
        widget: _react.PropTypes.shape(WidgetPropType),
        onSettings: _react.PropTypes.func
    };
};