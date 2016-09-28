'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _close = require('./close');

var _close2 = _interopRequireDefault(_close);

var _loading = require('../../icons/loading');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createListItems(points, selectedPoint, onSelect) {
    if (points.length === 0) {
        return _react2.default.createElement(
            'li',
            { className: 'mCHistoryListItem mCHistoryListLoading' },
            _react2.default.createElement(_loading2.default, null)
        );
    }
    return points.map(function (p, i) {
        var coordinatesStr = p.coordinates.reduce(function (str, c) {
            return str + ', ' + c;
        });
        var isSelectedPoint = p === selectedPoint;
        var historyItemClassName = 'mCHistoryListItem ' + (isSelectedPoint ? 'mCHistoryListItemSelected' : '');
        return _react2.default.createElement(
            'li',
            { className: historyItemClassName, key: 'history-list-' + i, onClick: function onClick() {
                    onSelect(p);
                } },
            _react2.default.createElement(
                'div',
                { className: 'mCHistoryListItemDescription rTypoRegular' },
                _react2.default.createElement(
                    'span',
                    { className: 'rTypoHeading' },
                    coordinatesStr
                ),
                _react2.default.createElement(
                    'ul',
                    { className: 'rUtilityResetList' },
                    _react2.default.createElement(
                        'li',
                        null,
                        'Arrived:'
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        p.entered.toString()
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        'Left:'
                    ),
                    _react2.default.createElement(
                        'li',
                        null,
                        p.left.toString()
                    )
                )
            )
        );
    });
}

exports.default = function (_ref) {
    var points = _ref.points;
    var selectedPoint = _ref.selectedPoint;
    var onSelect = _ref.onSelect;
    var onClose = _ref.onClose;

    return _react2.default.createElement(
        'div',
        { className: 'mCHistoryListContainer' },
        _react2.default.createElement(
            'div',
            { className: 'mCHistoryListHeader' },
            'Device location history',
            _react2.default.createElement(_close2.default, { onClose: onClose })
        ),
        _react2.default.createElement(
            'ul',
            { className: 'mCHistoryList' },
            createListItems(points, selectedPoint, onSelect)
        )
    );
};