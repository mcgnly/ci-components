import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import React from 'react';

import HealthMonitorListItem from '../../../src/healthMonitor/components/listItem';

function setup() {
    let props = { count: 100, status: 'online' };

    let output = shallow(<HealthMonitorListItem {...props}/>);

    return {
        props,
        output
    };
}

describe('component <ListItemComponent/>', () => {
    let output;
    let props;
    beforeEach(function() {
        const setupObj = setup();
        output = setupObj.output;
        props = setupObj.props;
    });

    it('should render a table list', () => {
        expect(output.find('tr')).to.have.length(1);
    });

    it('should render the status with description', () => {
        expect(output.find('tr').text()).to.have.string('Devices online');
    });

    it('should render the count', () => {
        expect(output.find('tr').text()).to.have.string('100 Devices');
    });
});
