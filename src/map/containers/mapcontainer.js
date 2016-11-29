import React from 'react';

import MapboxGl from 'mapbox-gl/dist/mapbox-gl';

const boundConf = {
    padding: 50,
    linear: true
};

export default ComposedComponent => class extends React.Component {
    constructor(props) {
        super(props);

        this.fitMap = this.fitMap.bind(this);
        this.onMapLoad = this.onMapLoad.bind(this);
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
    }

    fitMap(points = [], map) {
        map = map || this.map;
        if (!map || points.length < 1) {
            return;
        }
        var bounds = new MapboxGl.LngLatBounds();
        points.forEach(p => bounds.extend(p.coordinates));
        map.fitBounds(bounds.toArray(), boundConf);
    }

    onMapLoad(map) {
        this.map = map;
        this.fitMap();
    }

    componentWillReceiveProps(nextProps) {
        const { sizeChanged } = nextProps;

        if (sizeChanged) {
            document.body.addEventListener('transitionend', () => this.map.resize());
        }
    }

    zoomIn(map) {
        this.map.setZoom(this.map.getZoom() + 1);
    }

    zoomOut(map) {
        this.map.setZoom(this.map.getZoom() - 1);
    }

    render() {
        return (
            <ComposedComponent
                {...this.props}
                fitMap={this.fitMap}
                onMapLoad={this.onMapLoad}
                onZoomIn={this.zoomIn}
                onZoomOut={this.zoomOut}
            />
        );
    }
};
