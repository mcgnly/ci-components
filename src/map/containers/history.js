import React from 'react';

import HistoryMap from '../components/history';
import HistoryList from '../components/historyList';

import MapContainer from './mapcontainer';

const noPointsMessage = {
    title: 'No device history found',
    message: 'We couldn\'t find any historical data for the specified device. Please try again or contact us for assistance.'
};
const failedPointsMessage = {
    title: 'Error',
    message: 'Could not get the historical location please try again'
};

export class MapHistoryContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points:  [],
            center: [0, 0],
            selectedPoint: {},
            message: 'loading'
        };

        this.service = this.props.service;

        this.onSelectItem = this.onSelectItem.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        return this.fetchData();
    }

    fetchData() {
        const { deviceID, fitMap } = this.props;
        return this.service.getHistory(deviceID).then((points) => {
            this.setState({
                points,
                selectedPoint: points[points.length - 1],
                message: points.length === 0 ? noPointsMessage : null
            });
            fitMap(points);
        }, () => {
            this.setState({
                message: failedPointsMessage
            });
        });
    }

    onSelectItem(point) {
        this.setState({
            selectedPoint: point
        });
    }

    render() {
        const { selectedPoint, points, message, center, popup, zoom } = this.state;
        const { onZoomIn, onZoomOut, onMapLoad, onCloseClick } = this.props;
        return (
            <div className="mOSectionSideBySide">
                <HistoryMap
                    points={points}
                    center={center}
                    popup={popup}
                    onMapClick={this.closePopup}
                    selectedPoint={selectedPoint}
                    onFeatureClick={this.onSelectItem}
                    onLoad={onMapLoad}
                    onZoomIn={onZoomIn}
                    onZoomOut={onZoomOut}
                    onRefresh={this.fetchData}
                ></HistoryMap>
                <HistoryList
                    message={message}
                    onClose={onCloseClick}
                    points={points}
                    selectedPoint={selectedPoint}
                    onSelect={this.onSelectItem}>
                </HistoryList>
            </div>
        );
    }
}

export default MapContainer(MapHistoryContainer);
