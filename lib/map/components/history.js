'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = MapHistory;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _basemap = require('./basemap');

var _basemap2 = _interopRequireDefault(_basemap);

var _controlPanel = require('../../components/controlPanel');

var _controlPanel2 = _interopRequireDefault(_controlPanel);

var _reactMapboxGl = require('react-mapbox-gl');

var _styleFactory = require('./styleFactory');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

MapHistory.propTypes = {
    points: _react.PropTypes.array.isRequired,
    selectedPoint: _react.PropTypes.object,
    center: _react.PropTypes.array,
    hasControlPanel: _react.PropTypes.bool,
    onFeatureClick: _react.PropTypes.func,
    onMapClick: _react.PropTypes.func,
    onLoad: _react.PropTypes.func,
    onZoomIn: _react.PropTypes.func,
    onZoomOut: _react.PropTypes.func,
    onRefresh: _react.PropTypes.func,
    onSettingsClick: _react.PropTypes.func,
    widget: _react.PropTypes.object
};

function MapHistory(_ref) {
    var points = _ref.points,
        _ref$selectedPoint = _ref.selectedPoint,
        selectedPoint = _ref$selectedPoint === undefined ? { coordinates: [] } : _ref$selectedPoint,
        center = _ref.center,
        _ref$hasControlPanel = _ref.hasControlPanel,
        hasControlPanel = _ref$hasControlPanel === undefined ? true : _ref$hasControlPanel,
        onFeatureClick = _ref.onFeatureClick,
        onMapClick = _ref.onMapClick,
        onLoad = _ref.onLoad,
        onZoomOut = _ref.onZoomOut,
        onZoomIn = _ref.onZoomIn,
        onRefresh = _ref.onRefresh,
        onSettingsClick = _ref.onSettingsClick,
        widget = _ref.widget;

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
        hasControlPanel ? _react2.default.createElement(_controlPanel2.default, { onRefresh: onRefresh, onAdd: function onAdd() {
                return onSettingsClick(widget, 'add');
            } }) : ''
    );
};