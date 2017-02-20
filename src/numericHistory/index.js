import React, { PropTypes } from 'react';
import { NumericPlot } from 'relayr-sensor-illustrations';

import Service from './numericHistory.service.js';
import WidgetHeader from '../components/header';

export default class NumberHistory extends React.Component {
    constructor(props) {
        super(props);
        const { devices, config: { readings } } = props;
        this.state = { points: [] };

        devices.forEach(({ id }, i) => {
            const reading = readings[i];
            this.service = new Service({
                id,
                meaning: reading.meaning,
                path: reading.path
            });
        });

        if (this.service) {
            this.service.getData({
                onDataRecieved: (points) => {
                    this.setState({ points });
                }
            });
        }
    }

    render() {
        const { title, type } = this.props;
        return (
            <li className="rBox rUtilityResetListItem mOWidgetBox mOFullWidget" data-qai-widget-type={type}>
                <WidgetHeader {...this.props}/>
                <div className="rBoxBody">
                    <NumericPlot data={this.state.points}></NumericPlot>
                </div>
            </li>
        );
    }
}

NumberHistory.propTypes = {
    title:        PropTypes.string,
    type:         PropTypes.string,
    devices:      PropTypes.array,
    config:       PropTypes.shape({
        readings: PropTypes.arrayOf(
            PropTypes.shape({
                path: PropTypes.string,
                meaning: PropTypes.string,
                id: PropTypes.string,
                valueSchema: PropTypes.object
            })
        )
    })
};
