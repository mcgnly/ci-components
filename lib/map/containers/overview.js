'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MapOverviewContainer = undefined;

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

var noPointsMessage = { title: 'No devices found', message: 'We couldn’t find any devices registered for your account. Please assign the devices you want to have displayed in this dashboard.' };
var failedPointsMessage = { title: 'Error', message: 'Could not get the location please try again' };

var MapOverviewContainer = exports.MapOverviewContainer = function (_React$Component) {
    _inherits(MapOverviewContainer, _React$Component);

    function MapOverviewContainer(props) {
        _classCallCheck(this, MapOverviewContainer);

        var _this = _possibleConstructorReturn(this, (MapOverviewContainer.__proto__ || Object.getPrototypeOf(MapOverviewContainer)).call(this, props));

        _this.state = {
            points: [],
            center: [0, 0],
            popup: {
                show: false
            },
            message: { message: 'loading' }
        };

        var _this$props = _this.props;
        var devices = _this$props.devices;
        var service = _this$props.service;

        _this.service = service;

        _this.onFeatureClick = _this.onFeatureClick.bind(_this);
        _this.closePopup = _this.closePopup.bind(_this);
        return _this;
    }

    _createClass(MapOverviewContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            var fitMap = this.props.fitMap;

            return this.service.getCoordinates().then(function (points) {
                var center = points[0] ? points[0].coordinates : [0, 0];
                _this2.setState({
                    points: points,
                    center: center,
                    message: points.length === 0 ? noPointsMessage : null
                });
                fitMap(points);
            }, function () {
                _this2.setState({
                    message: failedPointsMessage
                });
            });
        }
    }, {
        key: 'onFeatureClick',
        value: function onFeatureClick(c) {
            var _props = this.props;
            var onPopupClick = _props.onPopupClick;
            var featureInstruction = _props.featureInstruction;

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
            var _state = this.state;
            var points = _state.points;
            var center = _state.center;
            var popup = _state.popup;
            var zoom = _state.zoom;
            var message = _state.message;
            var _props2 = this.props;
            var onZoomIn = _props2.onZoomIn;
            var onZoomOut = _props2.onZoomOut;
            var onMapLoad = _props2.onMapLoad;
            var height = _props2.height;

            return _react2.default.createElement(_overview2.default, {
                points: points,
                message: message,
                center: center,
                popup: popup,
                onMapClick: this.closePopup,
                onFeatureClick: this.onFeatureClick,
                onLoad: onMapLoad,
                onZoomIn: onZoomIn,
                onZoomOut: onZoomOut,
                height: height
            });
        }
    }]);

    return MapOverviewContainer;
}(_react2.default.Component);

exports.default = (0, _mapcontainer2.default)(MapOverviewContainer);