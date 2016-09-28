'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _basemap = require('./basemap');

var _basemap2 = _interopRequireDefault(_basemap);

var _reactMapboxGl = require('react-mapbox-gl');

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
        'ul',
        { className: 'rUtilityResetList mCHistoryMap' },
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
                    paint: { "circle-radius": 6, "circle-color": "#6FC3F9" } },
                features
            ),
            _react2.default.createElement(
                _reactMapboxGl.Layer,
                {
                    id: 'route-line',
                    type: 'line',
                    layout: { 'line-cap': 'round', 'line-join': 'round' },
                    paint: { 'line-color': '#6FC3F9', 'line-width': 2 } },
                _react2.default.createElement(_reactMapboxGl.Feature, { coordinates: route })
            ),
            _react2.default.createElement(
                _reactMapboxGl.Layer,
                {
                    id: 'selected-marker',
                    type: 'symbol',
                    layout: { 'icon-image': 'pin-red', 'icon-offset': [0, -20] } },
                _react2.default.createElement(_reactMapboxGl.Feature, { coordinates: selectedCoordinates })
            )
        )
    );
};