'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactMapboxGl = require('react-mapbox-gl');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var show = _ref.show;
    var title = _ref.title;
    var id = _ref.id;
    var _ref$coordinates = _ref.coordinates;
    var coordinates = _ref$coordinates === undefined ? [] : _ref$coordinates;
    var onMapClick = _ref.onClick;

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
            'Show history'
        )
    );
    return show ? popup : _react2.default.createElement('div', null);
};