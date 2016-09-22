import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

import React from 'react';

import { MapHistoryContainer, __RewireAPI__ as MapHistoryContainerRewireAPI } from '../../../src//map/containers/history';
import HistoryList from '../../../src//map/components/historyList';
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
        deviceID: 'history-device-id'
    };

    let wrapper = mount(<MapHistoryContainer {...props}/>);

    return {
        props,
        wrapper
    };
}

describe('widget Map <MapHistory/> container', () => {
    let wrapper;
    beforeEach(function() {
        wrapper = setup().wrapper;
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

    describe('onload', () => {

        it('should get the history for the specified id', () => {
            expect(getHistoryStub).to.have.been.calledWith('history-device-id');
        });
    });
});
