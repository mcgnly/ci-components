import { expect } from 'chai';
import { shallow } from 'enzyme';

import React from 'react';

import HealthMonitorComponent from '../../../src/healthMonitor/components';
import HealthMonitorListItem from '../../../src/healthMonitor/components/listItem';
import HealthMonitorEmptyItem from '../../../src/healthMonitor/components/emptyItem';
import HealthMonitorStatusAlert from '../../../src/healthMonitor/components/statusAlert';

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

    describe('has statuses', () => {
        it('should render a HealthMonitorListIitem per status', () => {
            expect(output.find(HealthMonitorListItem)).to.have.length(4);
        });

        it('should pass status the list item', () => {
            let outputProps = output.find(HealthMonitorListItem).first().props();
            expect(outputProps.count).to.equal(1);
            expect(outputProps.status).to.equal('online');
            expect(typeof outputProps.onClick).to.equal('function');
        });

        it('should render an alert status item', () => {
            expect(output.find(HealthMonitorStatusAlert)).to.have.length(1);
        });
    });

    describe('has no statuses', () => {
        beforeEach(() => {
            output.setProps({
                statuses: []
            });
        });

        it('should render a no devices message when there are no status', () => {
            expect(output.find(HealthMonitorListItem)).to.have.length(0);
            expect(output.find(HealthMonitorEmptyItem)).to.have.length(1);
        });
    });

});
