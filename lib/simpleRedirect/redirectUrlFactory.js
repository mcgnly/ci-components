"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function healthMonitor(config) {
    if (config.healthMonitorId) {
        return "/healthMonitor/" + config.healthMonitorId;
    }

    return null;
}

exports.default = {
    healthMonitor: healthMonitor
};