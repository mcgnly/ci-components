import React from 'react';
import { NumericPlot } from 'relayr-sensor-illustrations';

import Service from './numericHistory.service.js';

export default class NumberHistory  extends React.Component {
    constructor(props) {
        super(props);
        const { title, readings} = props;
        this.title = title;
        this.state = { points: []}

        readings.forEach((reading) => {
            this.service = new Service({
                id: reading.id,
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
            <li className="rBox rUtilityResetListItem mOWidgetBox">
                <div className="rBoxHeader">
                    {title}
                </div>
                <div className="rBoxBody">
                    <NumericPlot data={this.state.points}></NumericPlot>
                </div>
            </li>
        )
    }
}
