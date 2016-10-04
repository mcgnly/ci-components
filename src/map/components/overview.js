import React from 'react';

import BaseMap from './basemap';

import { Layer, Feature } from 'react-mapbox-gl';

import { sourceOptions } from '../config';

import LoadIcon from '../../icons/loading';

const markerSettings = {
    layout: { 'text-size': 14 },
    paint: { 'text-color': '#FFFFFF', 'text-translate': [0, -6] }
};

const minFilter = {
    filter: ['>=', 'point_count', 2]
};

export default ({ points, center, popup = {}, onFeatureClick, onMapClick, onLoad, onZoomOut, onZoomIn }) => {
    const features = points.map((c) => (<Feature coordinates={c.coordinates} properties={c.properties} onClick={() => onFeatureClick(c)}/>));
    let loading = '';
    if (points.length === 0) {
        loading = (
            <div className="mUCenterFullScreen">
                <LoadIcon/>
            </div>
        );
    }
    return (
        <div>
            {loading}
            <BaseMap
                center={center}
                popup={popup}
                onLoad={onLoad}
                onMapClick={onMapClick}
                onZoomIn={onZoomIn}
                onZoomOut={onZoomOut}
                >
                <Layer
                    id="marker"
                    type="symbol"
                    sourceOptions={sourceOptions}
                    layout={{ 'icon-image': 'pin' }}>
                    {features}
                </Layer>

                <Layer
                    id="cluster-count"
                    type="symbol"
                    layout={Object.assign({}, markerSettings.layout, { 'text-field': '{point_count}' })}
                    paint={markerSettings.paint}
                    sourceOptions={sourceOptions}
                    layerOptions={minFilter}
                >
                    {features}
                </Layer>
            </BaseMap>
        </div>
    );
};
