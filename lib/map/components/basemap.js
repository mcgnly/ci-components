'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMapboxGl = require('react-mapbox-gl');

var _reactMapboxGl2 = _interopRequireDefault(_reactMapboxGl);

var _config = require('../config');

var _popup = require('./popup');

var _popup2 = _interopRequireDefault(_popup);

var _zoom = require('./zoom');

var _zoom2 = _interopRequireDefault(_zoom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var center = _ref.center,
        _ref$popup = _ref.popup,
        popup = _ref$popup === undefined ? {} : _ref$popup,
        onMapClick = _ref.onMapClick,
        onLoad = _ref.onLoad,
        onZoomOut = _ref.onZoomOut,
        onZoomIn = _ref.onZoomIn,
        children = _ref.children,
        _ref$className = _ref.className,
        className = _ref$className === undefined ? '' : _ref$className,
        _ref$height = _ref.height,
        height = _ref$height === undefined ? '92vh' : _ref$height;

    return _react2.default.createElement(
        'div',
        { className: 'mCMapContainer ' + className },
        _react2.default.createElement(
            _reactMapboxGl2.default,
            {
                style: _config.style,
                center: center,
                onStyleLoad: onLoad,
                containerStyle: { height: height },
                movingMethod: 'jumpTo',
                accessToken: _config.token,
                pitch: 0,
                onClick: onMapClick },
            children,
            _react2.default.createElement(_popup2.default, popup),
            _react2.default.createElement(_zoom2.default, { onZoomIn: onZoomIn, onZoomOut: onZoomOut })
        ),
        _react2.default.createElement(
            'a',
            { href: 'http://mapbox.com/about/maps', className: 'mCMapContainerMapboxLogo', target: '_blank' },
            'Mapbox'
        )
    );
};