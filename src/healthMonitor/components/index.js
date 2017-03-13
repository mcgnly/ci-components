import React, { PropTypes } from 'react';

import ListItem from './listItem';
import EmptyListItem from './emptyItem';
import StatusAlert from './statusAlert';
import WidgetHeader from '../../components/header';

function renderStatus(statuses, onLinkClick) {
    return statuses.map((status, i) => <ListItem key={`health-monitor-item-${i}`} {...status} onClick={() => onLinkClick(status.status)} status={status.status} />);
}

function renderNoDeviceMessage(onLinkClick) {
    return <EmptyListItem onClick={() => onLinkClick()}/>;
}

export default function HealthMonitor(props) {
    const { statuses, onLinkClick, overAllStatus, type } = props;
    return (
        <li className="rBox mOWidgetBox mOFullWidget" data-qai-widget-type={type}>
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
                    { statuses.length === 0 ? renderNoDeviceMessage(onLinkClick) : renderStatus(statuses, onLinkClick)}
                </tbody>
            </table>
            <StatusAlert status={overAllStatus}/>
        </li>
    );
};

HealthMonitor.propTypes = {
    status: PropTypes.oneOf(['online', 'offline', 'outage', 'inactive']).isRequired,
    onLinkClick: PropTypes.func.isRequired,
    overAllStatus: PropTypes.oneOf(['online', 'offline', 'outage', 'inactive']).isRequired,
    type: PropTypes.string
};
