import React, { PropTypes } from 'react';

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


export default function StatusSymbol({ status, children }) {
    return (
        <span className={`mCWidgetHealthStatus ${getClass(status)}`}>
            {children}
        </span>
    );
};

StatusSymbol.propTypes = {
    status:     PropTypes.oneOf(['online', 'offline', 'outage', 'inactive']).isRequired,
    children:   PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element), PropTypes.string])
};
