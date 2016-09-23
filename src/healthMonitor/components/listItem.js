import React from 'react';

import StatusSymbol from './statusSymbol';

export default ({ count, status, onClick }) => {
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
