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

var _humanReadable = require('./time/humanReadable');

var _humanReadable2 = _interopRequireDefault(_humanReadable);

var _header = require('./components/header');

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (ComposedComponent) {
    return function (_React$Component) {
        _inherits(_class, _React$Component);

        function _class(props) {
            _classCallCheck(this, _class);

            var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

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

        _createClass(_class, [{
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
                var _props = this.props,
                    title = _props.title,
                    onSettings = _props.onSettings;
                var lastMessage = this.state.lastMessage;

                return _react2.default.createElement(
                    'li',
                    { className: 'rBox rUtilityResetListItem mOWidgetBox' },
                    _react2.default.createElement(_header2.default, this.props),
                    _react2.default.createElement(
                        'div',
                        { className: 'rBoxBody' },
                        _react2.default.createElement(
                            'div',
                            { className: 'mOSmallWidget' },
                            _react2.default.createElement(ComposedComponent, _extends({}, this.props, { state: this.state }))
                        )
                    )
                );
            }
        }]);

        return _class;
    }(_react2.default.Component);
};