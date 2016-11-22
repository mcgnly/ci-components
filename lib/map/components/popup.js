'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMapboxGl = require('react-mapbox-gl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var show = _ref.show,
        title = _ref.title,
        id = _ref.id,
        _ref$coordinates = _ref.coordinates,
        coordinates = _ref$coordinates === undefined ? [] : _ref$coordinates,
        featureInstruction = _ref.featureInstruction,
        onMapClick = _ref.onClick;

    var popup = _react2.default.createElement(
        _reactMapboxGl.Popup,
        { coordinates: coordinates, anchor: 'bottom' },
        _react2.default.createElement(
            'div',
            { className: 'mCPopup', onClick: function onClick() {
                    return onMapClick(id);
                } },
            _react2.default.createElement(
                'a',
                { className: 'mCPopupHeader normalize' },
                _react2.default.createElement(
                    'span',
                    { className: 'mCPopupTitle' },
                    title
                )
            ),
            featureInstruction
        )
    );
    return show ? popup : _react2.default.createElement('div', null);
};