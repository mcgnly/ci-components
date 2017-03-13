import React, { PropTypes } from 'react';

export default function EmtpyItem({ onClick }) {
    return (
        <tr className="mCWidgetHealthMonitorRow" onClick={onClick}>
            <td className="rTableCell" colSpan="2">
                No device statuses was found
            </td>
            <td className="rTableCell rTableCellWide mCWidgetHealthLink">
            </td>
        </tr>
    );
};

EmtpyItem.propTypes = {
    onClick: PropTypes.func.isRequired
};
