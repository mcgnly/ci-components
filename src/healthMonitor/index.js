import React from 'react';

import Service from './service';

import HealthMonitorComponent from './components';

export default class HealthMonitorContainer extends React.Component {
    constructor(props) {
        super(props);
        this.service = new Service();

        this.state = {
            statuses: [],
            statusGroups: []
        };

        this.onLinkClick = this.onLinkClick.bind(this);
    }

    componentDidMount() {
        const { config: { healthMonitorId } } = this.props;
        this.service.getHealthMonitorStatus(healthMonitorId).then((statuses) => {
            const statusGroups = this.countStatus(statuses);
            this.setState({
                statusGroups,
                statuses,
                currentStatus: this.getCurrentStatus(statuses)
            });
        });
    }

    countStatus(statuses) {
        function count(statuses, countStatus) {
            return statuses.reduce((sum, { status }) => {
                return sum += countStatus === status ? 1 : 0;
            }, 0);
        }
        return [
            { status: 'online', count: count(statuses, 'online') },
            { status: 'outage', count: count(statuses, 'outage') },
            { status: 'offline', count: count(statuses, 'offline') },
            { status: 'inactive', count: count(statuses, 'inactive') }
        ];
    }

    getCurrentStatus(statuses) {
        function hasStatus(lookupStatus) {
            return statuses.find(({ status }) => status === lookupStatus);
        }
        if (hasStatus('offline')) {
            return 'offline';
        } else if (hasStatus('outage')) {
            return 'outage';
        } else if (hasStatus('online')) {
            return 'online';
        } else {
            return 'inactive';
        }
    }

    onLinkClick(status) {
        const { redirectMethod, config } = this.props;

        if (config.healthMonitorId) {
            redirectMethod(`/healthMonitor/${config.healthMonitorId}?filter=${status}`);
        }
    }

    render() {
        const { statusGroups, currentStatus } = this.state;
        return (<HealthMonitorComponent {...this.props} statuses={statusGroups} overAllStatus={currentStatus} onLinkClick={this.onLinkClick}/>);
    }
}
