'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _mapboxGl = require('mapbox-gl/dist/mapbox-gl');

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var boundConf = {
    padding: 50,
    linear: true
};

exports.default = function (ComposedComponent) {
    return function (_React$Component) {
        _inherits(_class, _React$Component);

        function _class(props) {
            _classCallCheck(this, _class);

            var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

            _this.fitMap = _this.fitMap.bind(_this);
            _this.onMapLoad = _this.onMapLoad.bind(_this);
            _this.zoomIn = _this.zoomIn.bind(_this);
            _this.zoomOut = _this.zoomOut.bind(_this);
            return _this;
        }

        _createClass(_class, [{
            key: 'fitMap',
            value: function fitMap() {
                var points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
                var map = arguments[1];

                map = map || this.map;
                if (!map || points.length < 1) {
                    return;
                }
                var bounds = new _mapboxGl2.default.LngLatBounds();
                points.forEach(function (p) {
                    return bounds.extend(p.coordinates);
                });
                map.fitBounds(bounds.toArray(), boundConf);
            }
        }, {
            key: 'onMapLoad',
            value: function onMapLoad(map) {
                this.map = map;
                this.fitMap();
            }
        }, {
            key: 'zoomIn',
            value: function zoomIn(map) {
                this.map.setZoom(this.map.getZoom() + 1);
            }
        }, {
            key: 'zoomOut',
            value: function zoomOut(map) {
                this.map.setZoom(this.map.getZoom() - 1);
            }
        }, {
            key: 'render',
            value: function render() {
                return _react2.default.createElement(ComposedComponent, _extends({}, this.props, {
                    fitMap: this.fitMap,
                    onMapLoad: this.onMapLoad,
                    onZoomIn: this.zoomIn,
                    onZoomOut: this.zoomOut
                }));
            }
        }]);

        return _class;
    }(_react2.default.Component);
};