import React from 'react';

import Close from './close';
import LoadingIcon from '../../icons/loading';

function createListItems(points, selectedPoint, onSelect) {
    if (points.length === 0) {
        return (
            <li className="mCHistoryListItem mCHistoryListLoading">
                <LoadingIcon/>
            </li>
        );
    }
    return points.map((p, i) => {
        const coordinatesStr = p.coordinates.reduce((str, c) => `${str}, ${c}`);
        const isSelectedPoint = p === selectedPoint;
        const historyItemClassName = `mCHistoryListItem ${isSelectedPoint ? 'mCHistoryListItemSelected' : ''}`;
        return (
            <li className={historyItemClassName} key={`history-list-${i}`} onClick={() => { onSelect(p); }}>
                <div className="mCHistoryListItemDescription rTypoRegular">
                    <span className="rTypoHeading">{coordinatesStr}</span>
                    <ul className="rUtilityResetList">
                        <li>Arrived:</li>
                        <li>{p.entered.toString()}</li>
                        <li>Left:</li>
                        <li>{p.left.toString()}</li>
                    </ul>
                </div>
            </li>
        );
    });
}

export default ({ points, selectedPoint, onSelect, onClose }) => {
    return (
        <div className="mCHistoryListContainer">
            <div className="mCHistoryListHeader">
                Device location history
                <Close onClose={onClose}/>
            </div>
            <ul className="mCHistoryList">
                {createListItems(points, selectedPoint, onSelect)}
            </ul>
        </div>
    );
};
