import React from 'react';
import moment from 'moment';

function humanReadableDiff(timestamp) {
    if (!timestamp) {
        return '';
    }
    let diff = timestamp.getTime() - (new Date()).getTime();
    return moment.duration(diff).humanize(true);
};

export default ({ timestamp }) => {
    return (
        <div>{humanReadableDiff(timestamp)}</div>
    );
};
