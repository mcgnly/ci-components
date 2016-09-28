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
    var center = _ref.center;
    var _ref$popup = _ref.popup;
    var popup = _ref$popup === undefined ? {} : _ref$popup;
    var onMapClick = _ref.onMapClick;
    var onLoad = _ref.onLoad;
    var onZoomOut = _ref.onZoomOut;
    var onZoomIn = _ref.onZoomIn;
    var children = _ref.children;
    var _ref$className = _ref.className;
    var className = _ref$className === undefined ? '' : _ref$className;

    return _react2.default.createElement(
        'li',
        { className: 'mCMapContainer ' + className },
        _react2.default.createElement(
            _reactMapboxGl2.default,
            {
                style: _config.style,
                center: center,
                onStyleLoad: onLoad,
                containerStyle: { height: '92vh' },
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