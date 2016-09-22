import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

import React from 'react';

import HealthMonitorContainer from '../../src//healthMonitor';
import HealthMonitor from '../../src//healthMonitor/components';

import healthMonitorStatusesFixture from '../fixtures/healthMonitorStatuses';

const getHealthMonitorStatusStub = sinon.stub().returns({
    then: (cb) => { cb(healthMonitorStatusesFixture); }
});
function fakeService() {
    return {
        getHealthMonitorStatus: getHealthMonitorStatusStub
    };
};
HealthMonitorContainer.__Rewire__('Service', fakeService);
function setup() {
    const props = {
        config: { healthMonitorId: 'test-id' },
        redirectMethod: sinon.spy()
    };
    let wrapper = mount(<HealthMonitorContainer {...props}/>);

    return {
        wrapper,
        props
    };
}

describe('healthMonitor widget', () => {
    let wrapper;
    let props;
    beforeEach(function() {
        let setupObj = setup();
        wrapper = setupObj.wrapper;
        props = setupObj.props;
    });

    describe('container', () => {
        it('should render the <HealthMonitor/> component with status counts', () => {
            expect(wrapper.find(HealthMonitor)).to.have.length(1);
        });
    });

    it('should create a service with devices', () => {
        expect(wrapper.instance().service).to.be.defined;
    });

    it('should redirect to the corresponding health monitor with the healthMonitorId', () => {
        wrapper.find(HealthMonitor).prop('onLinkClick')();
        expect(props.redirectMethod).to.have.been.calledWith('/healthMonitor/test-id');
    });

    describe('on mount', () => {
        it('should fetch the monitor status with provided monitor id', () => {
            expect(wrapper.instance().service.getHealthMonitorStatus).to.have.been.calledWith('test-id');
            expect(wrapper.state('statuses')).to.deep.equal(healthMonitorStatusesFixture);
        });

        it('should count the number of status and group them', () => {
            expect(wrapper.state('statusGroups')).to.deep.equal([
                { status: 'online', count: 2 },
                { status: 'outage', count: 3 },
                { status: 'offline', count: 3 },
                { status: 'inactive', count: 1 }
            ]);
        });

        it('should render the current status to the offline if there is one offline', () => {
            expect(wrapper.state('currentStatus')).to.be.equal('offline');
        });

        it('should render the current status to the outage if there is outage but no offline', () => {
            getHealthMonitorStatusStub.returns({
                then: (cb) => { cb([
                    { status: 'outage' },
                    { status: 'online' }
                ]); }
            });
            wrapper.unmount();
            wrapper.mount();
            expect(wrapper.state('currentStatus')).to.be.equal('outage');
        });

        it('should render the current status to the online if there is online but no outage/offline', () => {
            getHealthMonitorStatusStub.returns({
                then: (cb) => { cb([{
                    status: 'online'
                }]); }
            });
            wrapper.unmount();
            wrapper.mount();
            expect(wrapper.state('currentStatus')).to.be.equal('online');
        });

        it('should render the current status to the inactive if there is inactive but no online/outage/offline', () => {
            getHealthMonitorStatusStub.returns({
                then: (cb) => { cb([
                    { status: 'inactive' }
                ]); }
            });
            wrapper.unmount();
            wrapper.mount();
            expect(wrapper.state('currentStatus')).to.be.equal('inactive');
        });
    });
});
