'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = MapOverview;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _basemap = require('./basemap');

var _basemap2 = _interopRequireDefault(_basemap);

var _reactMapboxGl = require('react-mapbox-gl');

var _config = require('../config');

var _loading = require('../../icons/loading');

var _loading2 = _interopRequireDefault(_loading);

var _controlPanel = require('../../components/controlPanel');

var _controlPanel2 = _interopRequireDefault(_controlPanel);

var _modal = require('../../components/modal');

var _modal2 = _interopRequireDefault(_modal);

var _styleFactory = require('./styleFactory');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var minFilter = {
    filter: ['>=', 'point_count', 2]
};

MapOverview.propTypes = {
    points: _react.PropTypes.array.isRequired,
    message: _react.PropTypes.object,
    showModals: _react.PropTypes.bool,
    hasControlPanel: _react.PropTypes.bool,
    center: _react.PropTypes.array,
    popup: _react.PropTypes.object,
    height: _react.PropTypes.string,
    widget: _react.PropTypes.object,
    onFeatureClick: _react.PropTypes.func,
    onMapClick: _react.PropTypes.func,
    onLoad: _react.PropTypes.func,
    onZoomIn: _react.PropTypes.func,
    onZoomOut: _react.PropTypes.func,
    onRefresh: _react.PropTypes.func,
    onSettingsClick: _react.PropTypes.func
};

function MapOverview(_ref) {
    var points = _ref.points,
        messageObj = _ref.message,
        _ref$showModals = _ref.showModals,
        showModals = _ref$showModals === undefined ? true : _ref$showModals,
        _ref$hasControlPanel = _ref.hasControlPanel,
        hasControlPanel = _ref$hasControlPanel === undefined ? true : _ref$hasControlPanel,
        center = _ref.center,
        _ref$popup = _ref.popup,
        popup = _ref$popup === undefined ? {} : _ref$popup,
        height = _ref.height,
        widget = _ref.widget,
        onFeatureClick = _ref.onFeatureClick,
        onMapClick = _ref.onMapClick,
        onLoad = _ref.onLoad,
        onZoomOut = _ref.onZoomOut,
        onZoomIn = _ref.onZoomIn,
        onRefresh = _ref.onRefresh,
        onSettingsClick = _ref.onSettingsClick;

    var messageComponent = '';
    if (showModals && messageObj && messageObj.message) {
        var title = messageObj.title,
            message = messageObj.message;

        messageComponent = message === 'loading' ? _react2.default.createElement(
            'div',
            { className: 'mUCenterFullScreen' },
            _react2.default.createElement(_loading2.default, null)
        ) : _react2.default.createElement(
            _modal2.default,
            { title: title },
            message
        );
    }

    var features = points.map(function (c) {
        return _react2.default.createElement(_reactMapboxGl.Feature, { key: 'feature-coordinate-' + c.coordinates, coordinates: c.coordinates, properties: c.properties, onClick: function onClick() {
                return onFeatureClick(c);
            } });
    });
    return _react2.default.createElement(
        'div',
        null,
        messageComponent,
        _react2.default.createElement(
            _basemap2.default,
            {
                center: center,
                popup: popup,
                onLoad: onLoad,
                onMapClick: onMapClick,
                onZoomIn: onZoomIn,
                onZoomOut: onZoomOut,
                height: height
            },
            _react2.default.createElement(
                _reactMapboxGl.Layer,
                {
                    id: 'marker',
                    type: 'symbol',
                    sourceOptions: _config.sourceOptions,
                    layout: (0, _styleFactory.layoutFactory)('marker') },
                features
            ),
            _react2.default.createElement(
                _reactMapboxGl.Layer,
                {
                    id: 'cluster-count',
                    type: 'symbol',
                    layout: (0, _styleFactory.layoutFactory)('clusterCount'),
                    paint: (0, _styleFactory.paintFactory)('clusterCount'),
                    sourceOptions: _config.sourceOptions,
                    layerOptions: minFilter
                },
                features
            )
        ),
        hasControlPanel ? _react2.default.createElement(_controlPanel2.default, { onRefresh: onRefresh, onAdd: function onAdd() {
                return onSettingsClick(widget, 'add');
            } }) : ''
    );
};