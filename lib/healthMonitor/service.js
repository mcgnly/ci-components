'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _relayrBrowserSdk = require('relayr-browser-sdk');

var _relayrBrowserSdk2 = _interopRequireDefault(_relayrBrowserSdk);

var _urls = require('../config/urls');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HealthMonitorService = function () {
    function HealthMonitorService() {
        _classCallCheck(this, HealthMonitorService);

        this.ajax = _relayrBrowserSdk2.default.customAjax({
            uri: _urls.ApiURL,
            token: _relayrBrowserSdk2.default.getCurrentUser().token
        });
    }

    _createClass(HealthMonitorService, [{
        key: 'getHealthMonitorStatus',
        value: function getHealthMonitorStatus(monitorId) {
            return this.ajax.get('/monitors/' + monitorId + '/statuses').then(function (response) {
                return response.data;
            });
        }
    }]);

    return HealthMonitorService;
}();

exports.default = HealthMonitorService;