import React from 'react';

import ListItem from './listItem';
import StatusAlert from './statusAlert';

export default ({ statuses, onLinkClick, overAllStatus }) => {
    return (
        <li className="rBox mOWidgetBox mOFullWidget">
            <table className="mOTable">
                <thead className="mOTableHeader">
                    <tr>
                        <th className="mOTableCell">
                            Devices overview
                        </th>
                        <th className="mOTableCell"></th>
                        <th className="mOTableCell"></th>
                    </tr>
                </thead>
                <tbody>
                    {statuses.map((status, i) => <ListItem key={`health-monitor-item-${i}`} {...status} onClick={onLinkClick}/>)}
                </tbody>
            </table>
            <StatusAlert status={overAllStatus}/>
        </li>
    );
};
