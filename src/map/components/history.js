import React from 'react';

import BaseMap from './basemap';

import { Layer, Feature } from 'react-mapbox-gl';

export default ({ points, selectedPoint = { coordinates: [] }, center, onFeatureClick, onMapClick, onLoad, onZoomOut, onZoomIn }) => {
    const features = points.filter((p) => p !== selectedPoint).map(c => (<Feature coordinates={c.coordinates || []} properties={c.properties} onClick={() => onFeatureClick(c)}/>));
    const route = points.map((c) => c.coordinates);
    const selectedCoordinates = selectedPoint.coordinates;
    return (
        <ul className="rUtilityResetList mCHistoryMap">
            <BaseMap
                center={center}
                onLoad={onLoad}
                onMapClick={onMapClick}
                onZoomIn={onZoomIn}
                onZoomOut={onZoomOut}
                >
                <Layer
                    id="route-makers"
                    type="circle"
                    paint={{ "circle-radius": 6, "circle-color": "#6FC3F9"}}>
                    {features}
                </Layer>
                <Layer
                    id="route-line"
                    type="line"
                    layout={{ 'line-cap': 'round', 'line-join': 'round' }}
                    paint={{ 'line-color': '#6FC3F9', 'line-width': 2 }}>
                    <Feature coordinates={route}/>
               </Layer>
               <Layer
                   id="selected-marker"
                   type="symbol"
                   layout={{ 'icon-image': 'pin-red', 'icon-offset': [0, -20]}}>
                   <Feature coordinates={selectedCoordinates}/>
               </Layer>
            </BaseMap>
        </ul>
    );
};
