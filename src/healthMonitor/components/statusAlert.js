import React from 'react';

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

export default ({ status }) => {
    return (
        <div className={`mCWidgetHealthAlerts ${getClass(status)}`}>
            Devices {status}
        </div>
    );
};
