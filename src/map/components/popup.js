import React from 'react';

import { Popup } from 'react-mapbox-gl';


export default ({ show, title, id, coordinates = [], featureInstruction, onClick: onMapClick }) => {
    const popup = (
        <Popup coordinates={coordinates} anchor="bottom">
            <div className="mCPopup" onClick={() => onMapClick(id)}>
                <a className="mCPopupHeader normalize">
                    <span className="mCPopupTitle">{title}</span>
                </a>
                {featureInstruction}
            </div>
        </Popup>
    );
    return (show ? popup : <div></div>);
};
