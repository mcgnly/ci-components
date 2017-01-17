import React, { PropTypes } from 'react';

import BaseMap from './basemap';
import ControlPanel from '../../components/controlPanel';

import { Layer, Feature } from 'react-mapbox-gl';

import { layoutFactory, paintFactory } from './styleFactory';

MapHistory.propTypes = {
    points: PropTypes.array.isRequired,
    selectedPoint: PropTypes.object,
    center: PropTypes.array,
    hasControlPanel: PropTypes.bool,
    onFeatureClick: PropTypes.func,
    onMapClick: PropTypes.func,
    onLoad: PropTypes.func,
    onZoomIn: PropTypes.func,
    onZoomOut: PropTypes.func,
    onRefresh: PropTypes.func,
    onSettingsClick: PropTypes.func,
    widget: PropTypes.object
};

export default function MapHistory({
    points,
    selectedPoint = { coordinates: [] },
    center,
    hasControlPanel = true,
    onFeatureClick,
    onMapClick,
    onLoad,
    onZoomOut,
    onZoomIn,
    onRefresh,
    onSettingsClick,
    widget
}) {
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
            { hasControlPanel ? <ControlPanel onRefresh={onRefresh} onAdd={() => onSettingsClick(widget, 'add')} onRemove={() => onSettingsClick(widget, 'remove')} /> : '' }
        </div>
    );
};
