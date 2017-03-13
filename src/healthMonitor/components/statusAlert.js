import React, { PropTypes } from 'react';

function getClass(status) {
    let st = status ? status.toLowerCase() : status;
    switch (st) {
        case 'offline':
            return 'mCWidgetHealthAlertsFailure';
        case 'outage':
            return 'mCWidgetHealthAlertsWarning';
        default:
            return 'mCWidgetHealthAlertHidden';
    }
};

export default function Status({ status }) {
    return (
        <div className={`mCWidgetHealthAlerts ${getClass(status)}`}>
            Devices {status}
        </div>
    );
};

Status.propTypes = {
    status: PropTypes.oneOf(['online', 'offline', 'outage', 'inactive']).isRequired,
};
