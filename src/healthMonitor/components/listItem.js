import React from 'react';

import StatusSymbol from './statusSymbol';

export default ({ count, status, onClick }) => {
    return (
        <tr className="mCWidgetHealthMonitorRow">
            <td className="mOTableCell mOTableCellWide">
                <StatusSymbol status={status}/> Devices {status}
            </td>
            <td className="mOTableCell mOTableCellCenter">
                {count} Devices
            </td>
            <td className="mOTableCell mOTableCellWide mCWidgetHealthLink" onClick={onClick}>
            </td>
        </tr>
    );
};
