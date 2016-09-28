import React from 'react';

import ListItem from './listItem';
import StatusAlert from './statusAlert';
import WidgetHeader from '../../components/header';

export default (props) => {
    const { statuses, onLinkClick, overAllStatus } = props;
    return (
        <li className="rBox mOWidgetBox mOFullWidget">
            <table className="rTable">
                <thead className="rTableHeader">
                    <tr>
                        <th className="rTableCell">
                            Devices overview
                        </th>
                        <th className="rTableCell"></th>
                        <th className="rTableCell"></th>
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
