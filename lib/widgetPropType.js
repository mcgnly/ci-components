'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.WidgetPropType = undefined;

var _react = require('react');

var WidgetPropType = exports.WidgetPropType = {
    id: _react.PropTypes.number,
    type: _react.PropTypes.string,
    version: _react.PropTypes.string,
    config: _react.PropTypes.shape({
        readings: _react.PropTypes.arrayOf(_react.PropTypes.shape({
            path: _react.PropTypes.string,
            meaning: _react.PropTypes.string,
            id: _react.PropTypes.string,
            valueSchema: _react.PropTypes.object
        })),
        links: _react.PropTypes.arrayOf(_react.PropTypes.shape({
            address: _react.PropTypes.string,
            name: _react.PropTypes.string
        })),
        min: _react.PropTypes.number,
        max: _react.PropTypes.number,
        unit: _react.PropTypes.string
    }),
    title: _react.PropTypes.string,
    query: _react.PropTypes.shape({
        deviceIds: _react.PropTypes.arrayOf(_react.PropTypes.string),
        deviceDescription: _react.PropTypes.string,
        deviceName: _react.PropTypes.string,
        firmwareVersion: _react.PropTypes.string
    }),
    results: _react.PropTypes.arrayOf(_react.PropTypes.shape({
        id: _react.PropTypes.string,
        owner: _react.PropTypes.string,
        name: _react.PropTypes.string,
        modelId: _react.PropTypes.string
    }))
};