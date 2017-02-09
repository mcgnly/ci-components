import React, { PropTypes } from 'react';
import moment from 'moment';

function humanReadableDiff(timestamp) {
    if (!timestamp) {
        return '';
    }
    let diff = timestamp.getTime() - (new Date()).getTime();
    return moment.duration(diff).humanize(true);
};

export default function HumanReadableTimestamp({ timestamp }) {
    if (!timestamp) return <span>No data have been sent</span>;
    return (<span>Last updated: {humanReadableDiff(timestamp)}</span>);
};


HumanReadableTimestamp.propTypes = {
    timestamp: PropTypes.instanceOf(Date)
};
