import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import React from 'react';

import HealthMonitorComponent from '../../../src//healthMonitor/components';
import HealthMonitorListItem from '../../../src//healthMonitor/components/listItem';
import HealthMonitorStatusAlert from '../../../src//healthMonitor/components/statusAlert';

function setup() {
    let props = {
        statuses: [
            { count: 1, status: 'online' },
            { count: 2, status: 'outage' },
            { count: 3, status: 'offline' },
            { count: 4, status: 'inactive' }
        ],
        onLinkClick: () => {}
    };

    let output = shallow(<HealthMonitorComponent {...props}/>);

    return {
        props,
        output
    };
}

describe('component <HealthMonitorComponent/>', () => {
    let output;
    let props;
    beforeEach(function() {
        const setupObj = setup();
        output = setupObj.output;
        props = setupObj.props;
    });

    it('should render a HealthMonitorListIitem per status', () => {
        expect(output.find(HealthMonitorListItem)).to.have.length(4);
    });

    it('should pass status the list item', () => {
        expect(output.find(HealthMonitorListItem).first().props()).to.deep.equal({
            onClick: props.onLinkClick,
            count: 1,
            status: 'online'
        });
    });

    it('should render an alert status item', () => {
        expect(output.find(HealthMonitorStatusAlert)).to.have.length(1);
    });
});
