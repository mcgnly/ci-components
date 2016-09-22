import React from 'react';

import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';

import { style, token } from '../config';

import MapPopup from './popup';
import Zoom from './zoom';

export default ({ center, popup = {}, onMapClick, onLoad, onZoomOut, onZoomIn, children, className = '' }) => {
    return (
        <li className={`mCMapContainer ${className}`}>
            <ReactMapboxGl
                style={style}
                center={center}
                onStyleLoad={onLoad}
                containerStyle={{ height: '92vh' }}
                movingMethod="jumpTo"
                accessToken={token}
                pitch={0}
                onClick={onMapClick}>

                {children}

                <MapPopup {...popup} />
                <Zoom onZoomIn={onZoomIn} onZoomOut={onZoomOut}/>
            </ReactMapboxGl>
            <a href="http://mapbox.com/about/maps" className='mCMapContainerMapboxLogo' target="_blank">Mapbox</a>
        </li>

    );
};
