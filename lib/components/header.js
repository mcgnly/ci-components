'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _humanReadable = require('../time/humanReadable');

var _humanReadable2 = _interopRequireDefault(_humanReadable);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
    var title = _ref.title;
    var lastMessage = _ref.lastMessage;
    var widget = _ref.widget;
    var showSettings = _ref.showSettings;
    var onSettingsClick = _ref.onSettingsClick;

    var settingsIcon = showSettings ? _react2.default.createElement('i', { className: 'fa fa-cog mCWidgetIcon mQaSettings', onClick: function onClick() {
            return onSettingsClick(widget);
        } }) : '';
    return _react2.default.createElement(
        'div',
        { className: 'rBoxHeader' },
        title,
        _react2.default.createElement(
            'span',
            null,
            _react2.default.createElement(_humanReadable2.default, { timestamp: lastMessage }),
            settingsIcon
        )
    );
};