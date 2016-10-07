import React from 'react';
import { NumericPlot } from 'relayr-sensor-illustrations';

import Service from './numericHistory.service.js';
import WidgetHeader from '../components/header';

export default class NumberHistory  extends React.Component {
    constructor(props) {
        super(props);
        const { title, devices, config: { readings } } = props;
        this.title = title;
        this.state = { points: []};

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
                    this.setState({points: points});
                }
            });
        }
    }

    render() {
        const { title } = this.props;
        return (
            <li className="rBox rUtilityResetListItem mOWidgetBox mOFullWidget">
                <WidgetHeader {...this.props}/>
                <div className="rBoxBody">
                    <NumericPlot data={this.state.points}></NumericPlot>
                </div>
            </li>
        )
    }
}
