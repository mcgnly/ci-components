import React from 'react';

import HistoryMap from '../components/history';
import HistoryList from '../components/historyList';

import MapContainer from './mapcontainer';

export class MapHistoryContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            points:  [],
            center: [0, 0],
            selectedPoint: {}
        };

        this.service = this.props.service;

        this.onSelectItem = this.onSelectItem.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        const { deviceID, fitMap } = this.props;
        this.service.getHistory(deviceID).then((points) => {
            this.setState({
                points,
                selectedPoint: points[points.length - 1]
            });
            fitMap(points);
        });
    }

    onSelectItem(point) {
        this.setState({
            selectedPoint: point
        });
    }

    render() {
        const { selectedPoint, points, center, popup, zoom } = this.state;
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
