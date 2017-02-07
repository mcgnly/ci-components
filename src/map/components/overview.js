import React, { PropTypes } from 'react';

import BaseMap from './basemap';

import { Layer, Feature } from 'react-mapbox-gl';

import { sourceOptions } from '../config';

import LoadingIcon from '../../icons/loading';
import ControlPanel from '../../components/controlPanel';
import Modal from '../../components/modal';

import { layoutFactory, paintFactory } from './styleFactory';

const minFilter = {
    filter: ['>=', 'point_count', 2]
};

MapOverview.propTypes = {
    points: PropTypes.array.isRequired,
    message: PropTypes.object,
    showModals: PropTypes.bool,
    hasControlPanel: PropTypes.bool,
    center: PropTypes.array,
    popup: PropTypes.object,
    height: PropTypes.string,
    widget: PropTypes.object,
    onFeatureClick: PropTypes.func,
    onMapClick: PropTypes.func,
    onLoad: PropTypes.func,
    onZoomIn: PropTypes.func,
    onZoomOut: PropTypes.func,
    onRefresh: PropTypes.func,
    onSettingsClick: PropTypes.func
};

export default function MapOverview({
    points,
    message: messageObj,
    showModals = true,
    hasControlPanel = true,
    center,
    popup = {},
    height,
    widget,
    onFeatureClick,
    onMapClick,
    onLoad,
    onZoomOut,
    onZoomIn,
    onRefresh,
    onSettingsClick
}) {
    let messageComponent = '';
    if (showModals && messageObj && messageObj.message) {
        const { title, message } = messageObj;
        messageComponent = message === 'loading' ? (<div className="mUCenterFullScreen"><LoadingIcon/></div>) : <Modal title={title}>{message}</Modal>;
    }

    const features = points.map((c) => (<Feature key={`feature-coordinate-${c.coordinates}`} coordinates={c.coordinates} properties={c.properties} onClick={() => onFeatureClick(c)}/>));
    return (
        <div data-qai-widget-type="map">
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
            { hasControlPanel ? <ControlPanel onRefresh={onRefresh} onAdd={() => onSettingsClick(widget, 'add')} /> : '' }
        </div>
    );
};
