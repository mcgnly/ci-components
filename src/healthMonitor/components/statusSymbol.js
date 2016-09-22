import React from 'react';

function getClass(status) {
    let st = status ? status.toLowerCase() : status;
    switch (st) {
        case 'inactive':
            return 'mCWidgetHealthStatusInactive';
        case 'offline':
            return 'mCWidgetHealthStatusFailure';
        case 'outage':
            return 'mCWidgetHealthStatusWarning';
        case 'online':
            return 'mCWidgetHealthStatusSuccess';
        default:
            return 'mCWidgetHealthStatusInactive';
    }
};


export default ({ status, children }) => {
    return (
        <span className={`mCWidgetHealthStatus ${getClass(status)}`}>
            {children}
        </span>
    );
};
