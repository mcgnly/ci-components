import React from 'react';

import BaseMap from './basemap';

import { Layer, Feature } from 'react-mapbox-gl';

import { layoutFactory, paintFactory } from './styleFactory';

export default ({ points, selectedPoint = { coordinates: [] }, center, onFeatureClick, onMapClick, onLoad, onZoomOut, onZoomIn }) => {
    const features = points.filter((p) => p !== selectedPoint).map(c => (<Feature coordinates={c.coordinates || []} properties={c.properties} onClick={() => onFeatureClick(c)}/>));
    const route = points.map((c) => c.coordinates);
    const selectedCoordinates = selectedPoint.coordinates;
    return (
        <div className="mCHistoryMap">
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
                    paint={paintFactory('routeMarkers')}>
                    {features}
                </Layer>
                <Layer
                    id="route-line"
                    type="line"
                    layout={layoutFactory('routeLine')}
                    paint={paintFactory('routeLine')}>
                    <Feature coordinates={route}/>
               </Layer>
               <Layer
                   id="selected-marker"
                   type="symbol"
                   layout={layoutFactory('selectedMarker')}>
                   <Feature coordinates={selectedCoordinates}/>
               </Layer>
            </BaseMap>
        </div>
    );
};
