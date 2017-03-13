'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = HealthMonitor;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _listItem = require('./listItem');

var _listItem2 = _interopRequireDefault(_listItem);

var _emptyItem = require('./emptyItem');

var _emptyItem2 = _interopRequireDefault(_emptyItem);

var _statusAlert = require('./statusAlert');

var _statusAlert2 = _interopRequireDefault(_statusAlert);

var _header = require('../../components/header');

var _header2 = _interopRequireDefault(_header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderStatus(statuses, onLinkClick) {
    return statuses.map(function (status, i) {
        return _react2.default.createElement(_listItem2.default, _extends({ key: 'health-monitor-item-' + i }, status, { onClick: function onClick() {
                return onLinkClick(status.status);
            }, status: status.status }));
    });
}

function renderNoDeviceMessage(onLinkClick) {
    return _react2.default.createElement(_emptyItem2.default, { onClick: function onClick() {
            return onLinkClick();
        } });
}

function HealthMonitor(props) {
    var statuses = props.statuses,
        onLinkClick = props.onLinkClick,
        overAllStatus = props.overAllStatus,
        type = props.type;

    return _react2.default.createElement(
        'li',
        { className: 'rBox mOWidgetBox mOFullWidget', 'data-qai-widget-type': type },
        _react2.default.createElement(
            'table',
            { className: 'rTable' },
            _react2.default.createElement(
                'thead',
                { className: 'rTableHeader' },
                _react2.default.createElement(
                    'tr',
                    null,
                    _react2.default.createElement(
                        'th',
                        { className: 'rTableCell' },
                        'Devices overview'
                    ),
                    _react2.default.createElement('th', { className: 'rTableCell' }),
                    _react2.default.createElement('th', { className: 'rTableCell' })
                )
            ),
            _react2.default.createElement(
                'tbody',
                null,
                statuses.length === 0 ? renderNoDeviceMessage(onLinkClick) : renderStatus(statuses, onLinkClick)
            )
        ),
        _react2.default.createElement(_statusAlert2.default, { status: overAllStatus })
    );
};

HealthMonitor.propTypes = {
    status: _react.PropTypes.oneOf(['online', 'offline', 'outage', 'inactive']).isRequired,
    onLinkClick: _react.PropTypes.func.isRequired,
    overAllStatus: _react.PropTypes.oneOf(['online', 'offline', 'outage', 'inactive']).isRequired,
    type: _react.PropTypes.string
};