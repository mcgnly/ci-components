function healthMonitor(config) {
    if (config.healthMonitorId) {
        return `/healthMonitor/${config.healthMonitorId}`;
    }

    return null;
}

export default {
    healthMonitor
};
