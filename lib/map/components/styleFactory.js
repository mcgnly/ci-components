'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.paintFactory = paintFactory;
exports.layoutFactory = layoutFactory;
var markerSettings = {
    layout: { 'text-size': 14 },
    paint: { 'text-color': '#FFFFFF', 'text-translate': [0, -6] }
};

function paintFactory(type) {
    switch (type) {
        case 'routeMarkers':
            return { 'circle-radius': 6, 'circle-color': '#6FC3F9' };
        case 'routeLine':
            return { 'line-color': '#6FC3F9', 'line-width': 2 };
        case 'clusterCount':
            return { 'text-color': '#FFFFFF', 'text-translate': [0, -6] };
        case 'selectedMarker':
            return;
    }
}

function layoutFactory(type) {
    switch (type) {
        case 'routeLine':
            return { 'line-cap': 'round', 'line-join': 'round' };
        case 'selectedMarker':
            return { 'icon-image': 'pin-red', 'icon-offset': [0, -20] };
        case 'clusterCount':
            return { 'text-size': 14, 'text-field': '{point_count}' };
        case 'marker':
            return { 'icon-image': 'pin' };
        default:
            console.warn('Millio widget, map layout factory an invalid type was used');
            return {};
    }
}