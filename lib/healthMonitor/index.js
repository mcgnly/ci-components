'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

var _components = require('./components');

var _components2 = _interopRequireDefault(_components);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var HealthMonitorContainer = function (_React$Component) {
    _inherits(HealthMonitorContainer, _React$Component);

    function HealthMonitorContainer(props) {
        _classCallCheck(this, HealthMonitorContainer);

        var _this = _possibleConstructorReturn(this, (HealthMonitorContainer.__proto__ || Object.getPrototypeOf(HealthMonitorContainer)).call(this, props));

        _this.service = new _service2.default();

        _this.state = {
            statuses: [],
            statusGroups: []
        };

        _this.onLinkClick = _this.onLinkClick.bind(_this);
        return _this;
    }

    _createClass(HealthMonitorContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var healthMonitorId = this.props.config.healthMonitorId;

            this.service.getHealthMonitorStatus(healthMonitorId).then(function (statuses) {
                var statusGroups = _this2.countStatus(statuses);
                _this2.setState({
                    statusGroups: statusGroups,
                    statuses: statuses,
                    currentStatus: _this2.getCurrentStatus(statuses)
                });
            });
        }
    }, {
        key: 'countStatus',
        value: function countStatus(statuses) {
            function count(statuses, countStatus) {
                return statuses.reduce(function (sum, _ref) {
                    var status = _ref.status;

                    return sum += countStatus === status ? 1 : 0;
                }, 0);
            }
            return [{ status: 'online', count: count(statuses, 'online') }, { status: 'outage', count: count(statuses, 'outage') }, { status: 'offline', count: count(statuses, 'offline') }, { status: 'inactive', count: count(statuses, 'inactive') }];
        }
    }, {
        key: 'getCurrentStatus',
        value: function getCurrentStatus(statuses) {
            function hasStatus(lookupStatus) {
                return statuses.find(function (_ref2) {
                    var status = _ref2.status;
                    return status === lookupStatus;
                });
            }
            if (hasStatus('offline')) {
                return 'offline';
            } else if (hasStatus('outage')) {
                return 'outage';
            } else if (hasStatus('online')) {
                return 'online';
            } else {
                return 'inactive';
            }
        }
    }, {
        key: 'onLinkClick',
        value: function onLinkClick() {
            var _props = this.props,
                redirectMethod = _props.redirectMethod,
                config = _props.config;


            if (config.healthMonitorId) {
                redirectMethod('/healthMonitor/' + config.healthMonitorId);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _state = this.state,
                statusGroups = _state.statusGroups,
                currentStatus = _state.currentStatus;

            return _react2.default.createElement(_components2.default, _extends({}, this.props, { statuses: statusGroups, overAllStatus: currentStatus, onLinkClick: this.onLinkClick }));
        }
    }]);

    return HealthMonitorContainer;
}(_react2.default.Component);

exports.default = HealthMonitorContainer;