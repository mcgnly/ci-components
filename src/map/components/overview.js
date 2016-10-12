import React from 'react';

import BaseMap from './basemap';

import { Layer, Feature } from 'react-mapbox-gl';

import { sourceOptions } from '../config';

import LoadIcon from '../../icons/loading';

import { layoutFactory, paintFactory } from './styleFactory';

const minFilter = {
    filter: ['>=', 'point_count', 2]
};

export default ({ points, message, center, popup = {}, height, onFeatureClick, onMapClick, onLoad, onZoomOut, onZoomIn }) => {
    let messageComponent = '';
    if (message) {
        messageComponent = (
            <div className="mUCenterFullScreen mQAMapMessage">
                { message === 'loading' ? <LoadIcon/> : <p>{message}</p> }
            </div>
        );
    }

    const features = points.map((c) => (<Feature coordinates={c.coordinates} properties={c.properties} onClick={() => onFeatureClick(c)}/>));
    return (
        <div>
            {messageComponent}
            <BaseMap
                center={center}
                popup={popup}
                onLoad={onLoad}
                onMapClick={onMapClick}
                onZoomIn={onZoomIn}
                onZoomOut={onZoomOut}
                height={height}
                >
                <Layer
                    id="marker"
                    type="symbol"
                    sourceOptions={sourceOptions}
                    layout={layoutFactory('marker')}>
                    {features}
                </Layer>

                <Layer
                    id="cluster-count"
                    type="symbol"
                    layout={layoutFactory('clusterCount')}
                    paint={paintFactory('clusterCount')}
                    sourceOptions={sourceOptions}
                    layerOptions={minFilter}
                >
                    {features}
                </Layer>
            </BaseMap>
        </div>
    );
};
