import React from 'react';

import Map from '../components/overview';
import MapContainer from './mapcontainer';

export class MapOverviewContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points:  [],
            center: [0, 0],
            popup: {
                show: false
            }
        };

        const { devices, service } = this.props;
        this.service = service;

        this.onFeatureClick = this.onFeatureClick.bind(this);
        this.closePopup = this.closePopup.bind(this);
    }

    componentDidMount() {
        const { fitMap } = this.props;
        this.service.getCoordinates().then((points) => {
            const center = points[0] ? points[0].coordinates : [0, 0];
            this.setState({
                points,
                center
            });
            fitMap(points);
        });
    }

    onFeatureClick(c) {
        const { onPopupClick } = this.props;
        this.setState({
            popup: {
                show: true,
                title: c.properties.title,
                id: c.properties.id,
                coordinates: c.coordinates,
                onClick: onPopupClick
            }
        });
    }

    closePopup() {
        this.setState({
            popup: {
                show: false
            }
        });
    }

    render() {
        const { points, center, popup, zoom } = this.state;
        const { onZoomIn, onZoomOut, onMapLoad } = this.props;
        return (
            <Map
                points={points}
                center={center}
                popup={popup}
                onMapClick={this.closePopup}
                onFeatureClick={this.onFeatureClick}
                onLoad={onMapLoad}
                onZoomIn={onZoomIn}
                onZoomOut={onZoomOut}
            />
        );
    }
}

export default MapContainer(MapOverviewContainer);
