'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.MapHistoryContainer = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _history = require('../components/history');

var _history2 = _interopRequireDefault(_history);

var _historyList = require('../components/historyList');

var _historyList2 = _interopRequireDefault(_historyList);

var _mapcontainer = require('./mapcontainer');

var _mapcontainer2 = _interopRequireDefault(_mapcontainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var noPointsMessage = {
    title: 'No device history found',
    message: 'We couldn\'t find any historical data for the specified device. Please try again or contact us for assistance.'
};

var failedPointsMessage = {
    title: 'Error',
    message: 'Could not get the historical location please try again'
};

var MapHistoryContainer = exports.MapHistoryContainer = function (_React$Component) {
    _inherits(MapHistoryContainer, _React$Component);

    function MapHistoryContainer(props) {
        _classCallCheck(this, MapHistoryContainer);

        var _this = _possibleConstructorReturn(this, (MapHistoryContainer.__proto__ || Object.getPrototypeOf(MapHistoryContainer)).call(this, props));

        _this.state = {
            points: [],
            center: [0, 0],
            selectedPoint: {},
            message: { message: 'loading' }
        };

        _this.service = _this.props.service;

        _this.onSelectItem = _this.onSelectItem.bind(_this);
        _this.fetchData = _this.fetchData.bind(_this);
        return _this;
    }

    _createClass(MapHistoryContainer, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            return this.fetchData();
        }
    }, {
        key: 'fetchData',
        value: function fetchData() {
            var _this2 = this;

            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
                _ref$fitTopMap = _ref.fitTopMap,
                fitTopMap = _ref$fitTopMap === undefined ? true : _ref$fitTopMap;

            var _props = this.props,
                deviceID = _props.deviceID,
                fitMap = _props.fitMap;

            return this.service.getHistory(deviceID).then(function (points) {
                _this2.setState({
                    points: points,
                    selectedPoint: points[points.length - 1],
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
        key: 'onSelectItem',
        value: function onSelectItem(point) {
            this.setState({
                selectedPoint: point
            });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                selectedPoint = _state.selectedPoint,
                points = _state.points,
                message = _state.message,
                center = _state.center,
                popup = _state.popup,
                zoom = _state.zoom;
            var _props2 = this.props,
                onZoomIn = _props2.onZoomIn,
                onZoomOut = _props2.onZoomOut,
                onMapLoad = _props2.onMapLoad,
                onCloseClick = _props2.onCloseClick;

            return _react2.default.createElement(
                'div',
                { className: 'mOSectionSideBySide' },
                _react2.default.createElement(_history2.default, {
                    points: points,
                    center: center,
                    popup: popup,
                    onMapClick: this.closePopup,
                    selectedPoint: selectedPoint,
                    onFeatureClick: this.onSelectItem,
                    onLoad: onMapLoad,
                    onZoomIn: onZoomIn,
                    onZoomOut: onZoomOut,
                    onRefresh: function onRefresh() {
                        return _this3.fetchData({ fitTopMap: false });
                    }
                }),
                _react2.default.createElement(_historyList2.default, {
                    message: message,
                    onClose: onCloseClick,
                    points: points,
                    selectedPoint: selectedPoint,
                    onSelect: this.onSelectItem })
            );
        }
    }]);

    return MapHistoryContainer;
}(_react2.default.Component);

exports.default = (0, _mapcontainer2.default)(MapHistoryContainer);