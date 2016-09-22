import React from 'react';

import { Popup } from 'react-mapbox-gl';

export default ({ show, title, id, coordinates = [], onClick }) => {
    const popup = (
        <Popup coordinates={coordinates} anchor="bottom">
            <div className="mCPopup" onClick={() => onClick(id)}>
                <a className="mCPopupHeader normalize">
                    <span className="mCPopupTitle">{title}</span>
                </a>
                Show history
            </div>
        </Popup>
    );
    return show ? popup : <div/>;
};
