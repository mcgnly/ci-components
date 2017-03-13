'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MapOverviewContainer = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _overview = require('../components/overview');

var _overview2 = _interopRequireDefault(_overview);

var _mapcontainer = require('./mapcontainer');

var _mapcontainer2 = _interopRequireDefault(_mapcontainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var noDevicesMessage = { title: 'No devices found', message: 'We couldn’t find any devices attached to this dashboard. Please assign the devices you want to have displayed in this dashboard.' };
var noPointsMessage = { title: 'No location data sent yet', message: 'The devices assigned to this dashboard have not sent any location data yet. Please, make sure they are working and check again later.' };
var failedPointsMessage = { title: 'Error', message: 'Could not get the location please try again' };

var MapOverviewContainer = exports.MapOverviewContainer = function (_React$Component) {
    _inherits(MapOverviewContainer, _React$Component);

    function MapOverviewContainer(props) {
        _classCallCheck(this, MapOverviewContainer);

        var _this = _possibleConstructorReturn(this, (MapOverviewContainer.__proto__ || Object.getPrototypeOf(MapOverviewContainer)).call(this, props));

        var _this$props = _this.props,
            devices = _this$props.devices,
            service = _this$props.service;


        _this.state = {
            points: [],
            center: [0, 0],
            popup: {
                show: false
            },
            message: !devices || devices.length === 0 ? noDevicesMessage : { message: 'loading' }
        };

        _this.service = service;

        _this.onFeatureClick = _this.onFeatureClick.bind(_this);
        _this.closePopup = _this.closePopup.bind(_this);
        _this.fetchData = _this.fetchData.bind(_this);
        return _this;
    }

    _createClass(MapOverviewContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            return this.fetchData();
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var newDevices = nextProps.devices,
                newService = nextProps.service;
            var _props = this.props,
                oldDevices = _props.devices,
                oldService = _props.service;

            if (newService !== oldService) {
                this.service = newService;
            }

            if (JSON.stringify(newDevices) !== JSON.stringify(oldDevices)) {
                return this.fetchData();
            }
        }
    }, {
        key: 'fetchData',
        value: function fetchData() {
            var _this2 = this;

            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref$fitTopMap = _ref.fitTopMap,
                fitTopMap = _ref$fitTopMap === undefined ? true : _ref$fitTopMap;

            var fitMap = this.props.fitMap;

            return this.service.getCoordinates().then(function (points) {
                var center = points[0] ? points[0].coordinates : [0, 0];
                _this2.setState({
                    points: points,
                    center: center,
                    message: points.length === 0 ? noPointsMessage : null
                });
                if (fitTopMap) {
                    fitMap(points);
                }
            }, function () {
                _this2.setState({
                    message: failedPointsMessage
                });
            });
        }
    }, {
        key: 'onFeatureClick',
        value: function onFeatureClick(c) {
            var _props2 = this.props,
                onPopupClick = _props2.onPopupClick,
                featureInstruction = _props2.featureInstruction;

            this.setState({
                popup: {
                    show: true,
                    title: c.properties.title,
                    id: c.properties.id,
                    coordinates: c.coordinates,
                    onClick: onPopupClick,
                    featureInstruction: featureInstruction
                }
            });
        }
    }, {
        key: 'closePopup',
        value: function closePopup() {
            this.setState({
                popup: {
                    show: false
                }
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                points = _state.points,
                center = _state.center,
                popup = _state.popup,
                zoom = _state.zoom,
                message = _state.message;
            var onMapLoad = this.props.onMapLoad;

            return _react2.default.createElement(_overview2.default, _extends({
                points: points,
                message: message,
                center: center,
                popup: popup,
                onMapClick: this.closePopup,
                onFeatureClick: this.onFeatureClick,
                onRefresh: function onRefresh() {
                    return _this3.fetchData({ fitTopMap: false });
                },
                onLoad: onMapLoad
            }, this.props));
        }
    }]);

    return MapOverviewContainer;
}(_react2.default.Component);

MapOverviewContainer.propTypes = {
    onMapLoad: _react.PropTypes.func,
    onPopupClick: _react.PropTypes.func,
    featureInstruction: _react.PropTypes.string,
    devices: _react.PropTypes.array,
    service: _react.PropTypes.object
};

exports.default = (0, _mapcontainer2.default)(MapOverviewContainer);