import React from 'react';

import MQTTService from './service/mqtt.js';

import HumanReadableTimestamp from './time/humanReadable';
import WidgetHeader from './components/header';
import WidgetSizes from './widgetSizes';
import WidgetLinkMenu from './components/widgetLinkMenu';

export default (ComposedComponent, widgetSize = WidgetSizes.small) => class extends React.Component {
    constructor(props) {
        super(props);
        const { readings = [], devices = [] } = props;

        this.state = {
            reading: 0
        };

        this.services = [];
        devices.forEach(({ id }) => {
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
        const { title, onSettings } = this.props;
        const { lastMessage } = this.state;
        const links  = [
            { name: 'Link 1', address: 'link1' },
            { name: 'Another Awesome(...)', address: 'another-awesome-link' },
            { name: 'Twitter', address: 'http://twitter.com' }
        ];
        return (
            <li className="rBox rUtilityResetListItem mOWidgetBox">
                <WidgetHeader {...this.props}/>
                <div className="rBoxBody mOWidgetBoxBody">
                    <div className={widgetSize.wrappingClass}>
                        <ComposedComponent {...this.props} state={this.state}/>
                    </div>
                    <WidgetLinkMenu links={links}/>
                </div>
            </li>
        );
    }
};
