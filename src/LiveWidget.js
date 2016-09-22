import React from 'react';

import MQTTService from './service/mqtt.js';

import HumanReadableTimestamp from './time/humanReadable';

export default ComposedComponent => class extends React.Component {
    constructor(props) {
        super(props);
        const { readings = [], devices = [] } = props;

        this.state = {
            reading: 0
        };

        this.services = [];
        devices.forEach((id) => {
            this.services = this.services.concat(readings.map(({ meaning, path }) => new MQTTService({
                id,
                meaning,
                path,
                onMessage: ({ value, lastMessage }) => {
                    this.setState({ reading: value, lastMessage });
                }
            })));
        });
    }

    componentDidMount() {
        this.currentTimeInterval = setInterval(() => {
            this.setState({ currentTime: new Date() });
        }, 1000);

        this.services.map((service) => {
            if (service.connect) {
                service.connect();
            }
        });
    }

    componentWillUnmount() {
        this.services.map((service) => {
            service.disconnect();
        });

        clearInterval(this.currentTimeInterval);
    }

    render() {
        const { title } = this.props;
        const { lastMessage } = this.state;
        return (
            <li className="rBox rUtilityResetListItem mOWidgetBox">
                <div className="rBoxHeader">
                    {title}
                    <HumanReadableTimestamp timestamp={lastMessage}></HumanReadableTimestamp>
                </div>
                <div className="rBoxBody">
                    <div className="mOSmallWidget">
                        <ComposedComponent {...this.props} state={this.state}/>
                    </div>
                </div>
            </li>
        );
    }
};
