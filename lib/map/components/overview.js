'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _basemap = require('./basemap');

var _basemap2 = _interopRequireDefault(_basemap);

var _reactMapboxGl = require('react-mapbox-gl');

var _config = require('../config');

var _loading = require('../../icons/loading');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var markerSettings = {
    layout: { 'text-size': 14 },
    paint: { 'text-color': '#FFFFFF', 'text-translate': [0, -6] }
};

var minFilter = {
    filter: ['>=', 'point_count', 2]
};

exports.default = function (_ref) {
    var points = _ref.points;
    var center = _ref.center;
    var _ref$popup = _ref.popup;
    var popup = _ref$popup === undefined ? {} : _ref$popup;
    var onFeatureClick = _ref.onFeatureClick;
    var onMapClick = _ref.onMapClick;
    var onLoad = _ref.onLoad;
    var onZoomOut = _ref.onZoomOut;
    var onZoomIn = _ref.onZoomIn;

    var features = points.map(function (c) {
        return _react2.default.createElement(_reactMapboxGl.Feature, { coordinates: c.coordinates, properties: c.properties, onClick: function onClick() {
                return onFeatureClick(c);
            } });
    });
    var loading = void 0;
    if (points.length === 0) {
        loading = _react2.default.createElement(
            'div',
            { className: 'mUCenterFullScreen' },
            _react2.default.createElement(_loading2.default, null)
        );
    }
    return _react2.default.createElement(
        'div',
        null,
        loading,
        _react2.default.createElement(
            _basemap2.default,
            {
                center: center,
                popup: popup,
                onLoad: onLoad,
                onMapClick: onMapClick,
                onZoomIn: onZoomIn,
                onZoomOut: onZoomOut
            },
            _react2.default.createElement(
                _reactMapboxGl.Layer,
                {
                    id: 'marker',
                    type: 'symbol',
                    sourceOptions: _config.sourceOptions,
                    layout: { 'icon-image': 'pin' } },
                features
            ),
            _react2.default.createElement(
                _reactMapboxGl.Layer,
                {
                    id: 'cluster-count',
                    type: 'symbol',
                    layout: Object.assign({}, markerSettings.layout, { 'text-field': '{point_count}' }),
                    paint: markerSettings.paint,
                    sourceOptions: _config.sourceOptions,
                    layerOptions: minFilter
                },
                features
            )
        )
    );
};