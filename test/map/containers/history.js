import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

import React from 'react';

import { MapHistoryContainer, __RewireAPI__ as MapHistoryContainerRewireAPI } from '../../../src/map/containers/history';
import HistoryList from '../../../src/map/components/historyList';
import dataPointFixture from '../../fixtures/mapHistory';

class DummyComp extends React.Component {
    render() {
        return (<div></div>);
    }
};

const getHistoryStub = sinon.stub().returns(new Promise((resolve) => {
    resolve(dataPointFixture);
}));

MapHistoryContainerRewireAPI.__Rewire__('HistoryMap', DummyComp);

function setup() {
    let props = {
        service: { getHistory: getHistoryStub },
        deviceID: 'history-device-id',
        fitMap: sinon.spy()
    };

    let wrapper = mount(<MapHistoryContainer {...props}/>);

    return {
        props,
        wrapper
    };
}

describe('widget Map <MapHistory/> container', () => {
    let wrapper;
    let props;
    beforeEach(function() {
        const setupObj = setup();
        wrapper = setupObj.wrapper;
        props = setupObj.props;
    });

    it('should render the <HistoryMap/> component', () => {
        expect(wrapper.find(DummyComp)).to.have.length(1);
    });

    it('should render the <HistoryList/> component', () => {
        expect(wrapper.find(HistoryList)).to.have.length(1);
    });

    describe('on marker click', () => {
        it('should change the the selected point to the clicked point', () => {
            wrapper.find(DummyComp).first().prop('onFeatureClick')({
                coordinates: [7, 7]
            });

            expect(wrapper.state('selectedPoint')).to.deep.equal({
                coordinates: [7, 7]
            });
        });
    });

    it('should set the latest location as selectedPoint', (done) => {
        setTimeout(function () {
            expect(wrapper.state('selectedPoint')).to.deep.equal({
                coordinates: [3, 3],
                entered: new Date('2016-03-22T12:40:03.744+0000'),
                left: new Date('2016-03-22T12:40:03.744+0000')
            });
            done();
        }, 0);
    });

    describe('on mount', () => {
        it('should get the history for the specified id', () => {
            expect(getHistoryStub).to.have.been.calledWith('history-device-id');
        });

        it('should set points and message to null on success', () => {
            return wrapper.instance().componentDidMount().then(() => {
                expect(wrapper.state('message')).to.not.be.defined;
                expect(wrapper.state('points')).to.deep.equal(dataPointFixture);
            });
        });

        it('should set a no points message if the points array is empty', () => {
            getHistoryStub.returns(new Promise((resolve) => {
                resolve([]);
            }));
            return wrapper.instance().componentDidMount().then(() => {
                expect(wrapper.state('message').title).to.equal('No device history found');
                expect(wrapper.state('message').message).to.be.defined;
            });
        });

        it('should set a failure message it it fails', () => {
            getHistoryStub.returns(new Promise((resolve, reject) => {
                reject([]);
            }));
            return wrapper.instance().componentDidMount().then(() => {
                expect(wrapper.state('message').title).to.equal('Error');
                expect(wrapper.state('message').message).to.be.defined;
            });
        });
    });

    describe('#componentWillReceiveProps', () => {
        beforeEach(() => {
            getHistoryStub.reset();
        });

        it('should update the service if a new service is provided', () => {
            const newDummyService = {
                getHistory: sinon.stub().returns({ then: () => {} })
            };
            wrapper.setProps({
                deviceID: 'new-device-id',
                service: newDummyService
            });
            expect(newDummyService.getHistory).to.have.been.calledOnce;
        });

        it('should fetch data if the devices changes', () => {
            wrapper.setProps({
                deviceID: 'new-device-id',
            });
            expect(getHistoryStub).to.have.been.calledOnce;
        });

        it('should not fetch data if the devices does not changes', () => {
            wrapper.setProps({
                deviceID: 'history-device-id'
            });
            expect(getHistoryStub).not.to.have.been.calledOnce;
        });
    });

    describe('on refresh click', () => {
        beforeEach(() => {
            getHistoryStub.reset();
            getHistoryStub.returns({
                then: (cb) => cb([])
            });
        });

        it('should get the location for the devices', () => {
            wrapper.find(DummyComp).prop('onRefresh')();
            expect(getHistoryStub).to.have.been.calledOnce;
        });

        it('should not fit the map', () => {
            props.fitMap.reset();
            wrapper.find(DummyComp).prop('onRefresh')();
            expect(props.fitMap).not.to.have.been.calledOnce;
        });
    });
});
