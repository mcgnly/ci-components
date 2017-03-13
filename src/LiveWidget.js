import React, { PropTypes } from 'react';

import MQTTService from './service/mqtt.js';

import WidgetHeader from './components/header';
import WidgetSizes from './widgetSizes';
import WidgetLinkMenu from './components/widgetLinkMenu';

import { WidgetPropType } from './widgetPropType';

export default (ComposedComponent, widgetSize = WidgetSizes.small) => {
    return class LiveWidget extends React.Component {
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
            const { lastMessage } = this.state;
            const { readings = [], widget = {}, type } = this.props;
            const hasLinks = 'config' in widget &&
                             'links' in widget.config &&
                             this.props.widget.config.links.length > 0;

            const firstReading = readings[0] || {};
            const { minimum: min, maximum: max, unit } = firstReading.valueSchema || {};
            return (
                <li className="rBox rUtilityResetListItem mOWidgetBox" data-qai-widget-type={type}>
                    <WidgetHeader {...this.props} lastMessage={lastMessage}/>
                    <div className="rBoxBody mOWidgetBoxBody">
                        <div className={widgetSize.wrappingClass}>
                            <ComposedComponent {...this.props} state={this.state} min={min} max={max} unit={unit}/>
                        </div>
                        { hasLinks && <WidgetLinkMenu links={this.props.widget.config.links}/> }
                    </div>
                </li>
            );
        }
    };

    LiveWidget.propTypes = {
        type: PropTypes.string,
        title: PropTypes.string,
        widget: PropTypes.shape(WidgetPropType),
        onSettings: PropTypes.func
    };
};
