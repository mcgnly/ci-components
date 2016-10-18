import React from 'react';

import Map from '../components/overview';
import MapContainer from './mapcontainer';

const noDevicesMessage = { title: 'No devices found', message: 'We couldn’t find any devices attached to this dashboard. Please assign the devices you want to have displayed in this dashboard.' };
const noPointsMessage = { title: 'No location data sent yet', message: 'The devices assigned to this dashboard have not sent any location data yet. Please, make sure they are working and check again later.' };
const failedPointsMessage = { title: 'Error', message: 'Could not get the location please try again' };

export class MapOverviewContainer extends React.Component {
    constructor(props) {
        super(props);
        const { devices, service } = this.props;

        this.state = {
            points:  [],
            center: [0, 0],
            popup: {
                show: false
            },
            message: (!devices || devices.length === 0) ? noDevicesMessage : { message: 'loading' }
        };

        this.service = service;

        this.onFeatureClick = this.onFeatureClick.bind(this);
        this.closePopup = this.closePopup.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        return this.fetchData();
    }

    fetchData({ fitTopMap = true } = {}) {
        const { fitMap } = this.props;
        return this.service.getCoordinates().then((points) => {
            const center = points[0] ? points[0].coordinates : [0, 0];
            this.setState({
                points,
                center,
                message: points.length === 0 ? noPointsMessage : null
            });
            if (fitTopMap) {
                fitMap(points);
            }
        }, () => {
            this.setState({
                message: failedPointsMessage
            });
        });
    }

    onFeatureClick(c) {
        const { onPopupClick, featureInstruction } = this.props;
        this.setState({
            popup: {
                show: true,
                title: c.properties.title,
                id: c.properties.id,
                coordinates: c.coordinates,
                onClick: onPopupClick,
                featureInstruction
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
        const { points, center, popup, zoom, message } = this.state;
        const { onMapLoad } = this.props;
        return (
            <Map
                points={points}
                message={message}
                center={center}
                popup={popup}
                onMapClick={this.closePopup}
                onFeatureClick={this.onFeatureClick}
                onRefresh={() => this.fetchData({ fitTopMap: false })}
                onLoad={onMapLoad}
                {...this.props}
            />
        );
    }
}

export default MapContainer(MapOverviewContainer);
