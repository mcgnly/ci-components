'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _basemap = require('./basemap');

var _basemap2 = _interopRequireDefault(_basemap);

var _controlPanel = require('../../components/controlPanel');

var _controlPanel2 = _interopRequireDefault(_controlPanel);

var _reactMapboxGl = require('react-mapbox-gl');

var _styleFactory = require('./styleFactory');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var points = _ref.points;
    var _ref$selectedPoint = _ref.selectedPoint;
    var selectedPoint = _ref$selectedPoint === undefined ? { coordinates: [] } : _ref$selectedPoint;
    var center = _ref.center;
    var onFeatureClick = _ref.onFeatureClick;
    var onMapClick = _ref.onMapClick;
    var onLoad = _ref.onLoad;
    var onZoomOut = _ref.onZoomOut;
    var onZoomIn = _ref.onZoomIn;
    var onRefresh = _ref.onRefresh;

    var features = points.filter(function (p) {
        return p !== selectedPoint;
    }).map(function (c) {
        return _react2.default.createElement(_reactMapboxGl.Feature, { coordinates: c.coordinates || [], properties: c.properties, onClick: function onClick() {
                return onFeatureClick(c);
            } });
    });
    var route = points.map(function (c) {
        return c.coordinates;
    });
    var selectedCoordinates = selectedPoint.coordinates;
    return _react2.default.createElement(
        'div',
        { className: 'mCHistoryMap' },
        _react2.default.createElement(
            _basemap2.default,
            {
                center: center,
                onLoad: onLoad,
                onMapClick: onMapClick,
                onZoomIn: onZoomIn,
                onZoomOut: onZoomOut
            },
            _react2.default.createElement(
                _reactMapboxGl.Layer,
                {
                    id: 'route-makers',
                    type: 'circle',
                    paint: (0, _styleFactory.paintFactory)('routeMarkers') },
                features
            ),
            _react2.default.createElement(
                _reactMapboxGl.Layer,
                {
                    id: 'route-line',
                    type: 'line',
                    layout: (0, _styleFactory.layoutFactory)('routeLine'),
                    paint: (0, _styleFactory.paintFactory)('routeLine') },
                _react2.default.createElement(_reactMapboxGl.Feature, { coordinates: route })
            ),
            _react2.default.createElement(
                _reactMapboxGl.Layer,
                {
                    id: 'selected-marker',
                    type: 'symbol',
                    layout: (0, _styleFactory.layoutFactory)('selectedMarker') },
                _react2.default.createElement(_reactMapboxGl.Feature, { coordinates: selectedCoordinates })
            )
        ),
        _react2.default.createElement(_controlPanel2.default, { onRefresh: onRefresh })
    );
};