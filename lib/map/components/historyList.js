'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.__RewireAPI__ = exports.__ResetDependency__ = exports.__set__ = exports.__Rewire__ = exports.__GetDependency__ = exports.__get__ = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _close = require('./close');

var _close2 = _interopRequireDefault(_close);

var _loading = require('../../icons/loading');

var _loading2 = _interopRequireDefault(_loading);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createListItems(points, selectedPoint, onSelect) {
    if (points.length === 0) {
        return _get__('React').createElement(
            'li',
            { className: 'mCHistoryListItem mCHistoryListLoading' },
            _get__('React').createElement(_get__('LoadingIcon'), null)
        );
    }
    return points.map(function (p, i) {
        var coordinatesStr = p.coordinates.reduce(function (str, c) {
            return str + ', ' + c;
        });
        var isSelectedPoint = p === selectedPoint;
        var historyItemClassName = 'mCHistoryListItem ' + (isSelectedPoint ? 'mCHistoryListItemSelected' : '');
        return _get__('React').createElement(
            'li',
            { className: historyItemClassName, key: 'history-list-' + i, onClick: function onClick() {
                    onSelect(p);
                } },
            _get__('React').createElement(
                'div',
                { className: 'mCHistoryListItemDescription rTypoRegular' },
                _get__('React').createElement(
                    'span',
                    { className: 'rTypoHeading' },
                    coordinatesStr
                ),
                _get__('React').createElement(
                    'ul',
                    { className: 'rUtilityResetList' },
                    _get__('React').createElement(
                        'li',
                        null,
                        'Arrived:'
                    ),
                    _get__('React').createElement(
                        'li',
                        null,
                        p.entered.toString()
                    ),
                    _get__('React').createElement(
                        'li',
                        null,
                        'Left:'
                    ),
                    _get__('React').createElement(
                        'li',
                        null,
                        p.left.toString()
                    )
                )
            )
        );
    });
}

var _DefaultExportValue = function _DefaultExportValue(_ref) {
    var points = _ref.points;
    var selectedPoint = _ref.selectedPoint;
    var onSelect = _ref.onSelect;
    var onClose = _ref.onClose;

    return _get__('React').createElement(
        'div',
        { className: 'mCHistoryListContainer' },
        _get__('React').createElement(
            'div',
            { className: 'mCHistoryListHeader' },
            'Device location history',
            _get__('React').createElement(_get__('Close'), { onClose: onClose })
        ),
        _get__('React').createElement(
            'ul',
            { className: 'mCHistoryList' },
            _get__('createListItems')(points, selectedPoint, onSelect)
        )
    );
};

exports.default = _DefaultExportValue;

var _RewiredData__ = Object.create(null);

var INTENTIONAL_UNDEFINED = '__INTENTIONAL_UNDEFINED__';
var _RewireAPI__ = {};

(function () {
    function addPropertyToAPIObject(name, value) {
        Object.defineProperty(_RewireAPI__, name, {
            value: value,
            enumerable: false,
            configurable: true
        });
    }

    addPropertyToAPIObject('__get__', _get__);
    addPropertyToAPIObject('__GetDependency__', _get__);
    addPropertyToAPIObject('__Rewire__', _set__);
    addPropertyToAPIObject('__set__', _set__);
    addPropertyToAPIObject('__reset__', _reset__);
    addPropertyToAPIObject('__ResetDependency__', _reset__);
    addPropertyToAPIObject('__with__', _with__);
})();

function _get__(variableName) {
    if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
        return _get_original__(variableName);
    } else {
        var value = _RewiredData__[variableName];

        if (value === INTENTIONAL_UNDEFINED) {
            return undefined;
        } else {
            return value;
        }
    }
}

function _get_original__(variableName) {
    switch (variableName) {
        case 'createListItems':
            return createListItems;

        case 'React':
            return _react2.default;

        case 'LoadingIcon':
            return _loading2.default;

        case 'Close':
            return _close2.default;
    }

    return undefined;
}

function _assign__(variableName, value) {
    if (_RewiredData__ === undefined || _RewiredData__[variableName] === undefined) {
        return _set_original__(variableName, value);
    } else {
        return _RewiredData__[variableName] = value;
    }
}

function _set_original__(variableName, _value) {
    switch (variableName) {}

    return undefined;
}

function _update_operation__(operation, variableName, prefix) {
    var oldValue = _get__(variableName);

    var newValue = operation === '++' ? oldValue + 1 : oldValue - 1;

    _assign__(variableName, newValue);

    return prefix ? newValue : oldValue;
}

function _set__(variableName, value) {
    if ((typeof variableName === 'undefined' ? 'undefined' : _typeof(variableName)) === 'object') {
        Object.keys(variableName).forEach(function (name) {
            _RewiredData__[name] = variableName[name];
        });
    } else {
        if (value === undefined) {
            _RewiredData__[variableName] = INTENTIONAL_UNDEFINED;
        } else {
            _RewiredData__[variableName] = value;
        }

        return function () {
            _reset__(variableName);
        };
    }
}

function _reset__(variableName) {
    delete _RewiredData__[variableName];
}

function _with__(object) {
    var rewiredVariableNames = Object.keys(object);
    var previousValues = {};

    function reset() {
        rewiredVariableNames.forEach(function (variableName) {
            _RewiredData__[variableName] = previousValues[variableName];
        });
    }

    return function (callback) {
        rewiredVariableNames.forEach(function (variableName) {
            previousValues[variableName] = _RewiredData__[variableName];
            _RewiredData__[variableName] = object[variableName];
        });
        var result = callback();

        if (!!result && typeof result.then == 'function') {
            result.then(reset).catch(reset);
        } else {
            reset();
        }

        return result;
    };
}

var _typeOfOriginalExport = typeof _DefaultExportValue === 'undefined' ? 'undefined' : _typeof(_DefaultExportValue);

function addNonEnumerableProperty(name, value) {
    Object.defineProperty(_DefaultExportValue, name, {
        value: value,
        enumerable: false,
        configurable: true
    });
}

if ((_typeOfOriginalExport === 'object' || _typeOfOriginalExport === 'function') && Object.isExtensible(_DefaultExportValue)) {
    addNonEnumerableProperty('__get__', _get__);
    addNonEnumerableProperty('__GetDependency__', _get__);
    addNonEnumerableProperty('__Rewire__', _set__);
    addNonEnumerableProperty('__set__', _set__);
    addNonEnumerableProperty('__reset__', _reset__);
    addNonEnumerableProperty('__ResetDependency__', _reset__);
    addNonEnumerableProperty('__with__', _with__);
    addNonEnumerableProperty('__RewireAPI__', _RewireAPI__);
}

exports.__get__ = _get__;
exports.__GetDependency__ = _get__;
exports.__Rewire__ = _set__;
exports.__set__ = _set__;
exports.__ResetDependency__ = _reset__;
exports.__RewireAPI__ = _RewireAPI__;