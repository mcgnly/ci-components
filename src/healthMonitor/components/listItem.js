import React, { PropTypes } from 'react';

import StatusSymbol from './statusSymbol';

export default function ListItem({ count, status, onClick }) {
    return (
        <tr className="mCWidgetHealthMonitorRow">
            <td className="rTableCell rTableCellWide">
                <StatusSymbol status={status}/> Devices {status}
            </td>
            <td className="rTableCell rTableCellCenter">
                {count} Devices
            </td>
            <td className="rTableCell rTableCellWide mCWidgetHealthLink" onClick={onClick}>
            </td>
        </tr>
    );
};

ListItem.propTypes = {
    count:      PropTypes.number.isRequired,
    status:     PropTypes.oneOf(['online', 'offline', 'outage', 'inactive']).isRequired,
    onClick:    PropTypes.func.isRequired
};
