import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

import React from 'react';

import { MapOverviewContainer, __RewireAPI__ as MapOverviewContainerRewireAPI } from '../../../src/map/containers/overview';


const getCoordinatesStub = sinon.stub().returns(new Promise((resolve) => {
    resolve([{
        properties: { title: 'coordinate title' },
        coordinates: [1, 1]
    }]);
}));
class DummyComp extends React.Component {
    render() {
        return (<div></div>);
    }
};
MapOverviewContainerRewireAPI.__Rewire__('Map', DummyComp);

function setup(devices = [{ id: 'test-id' }]) {
    let props = {
        service: { getCoordinates: getCoordinatesStub },
        fitMap: sinon.spy(),
        devices
    };

    let wrapper = mount(<MapOverviewContainer {...props}/>);

    return {
        props,
        wrapper
    };
}

describe('widget Map <MapOverviewContainer/> container', () => {
    let wrapper;
    let props;
    beforeEach(function() {
        const setupObj = setup();
        wrapper = setupObj.wrapper;
        props = setupObj.props;
    });

    afterEach(() => {
        getCoordinatesStub.reset();
    });

    it('should render the map component', () => {
        expect(wrapper.find(DummyComp)).to.have.length(1);
    });

    it('should default popup to be hidden', () => {
        expect(wrapper.state('popup')).to.deep.equal({
            show: false
        });
    });

    it('should have default message set to loading when there is devices to load', () => {
        expect(wrapper.state('message')).to.deep.equal({ message: 'loading' });
    });

    it('should show no devices messages when there is no devices', () => {
        wrapper = setup(null).wrapper;

        expect(wrapper.state('message').title).to.deep.equal('No devices found');

        wrapper = setup([]).wrapper;
        expect(wrapper.state('message').title).to.deep.equal('No devices found');
    });

    describe('on mount', () => {
        it('should get data from the service', () => {
            expect(wrapper.instance().service.getCoordinates).to.have.been.calledOnce;
        });

        it('should set state points and center', () => {
            expect(wrapper.state('points')).to.deep.equal([{
                properties: { title: 'coordinate title' },
                coordinates: [1, 1]
            }]);
            expect(wrapper.state('center')).to.deep.equal([1, 1]);
        });

        it('should set a no points message if the points array is empty', () => {
            getCoordinatesStub.returns(new Promise((resolve) => {
                resolve([]);
            }));
            return wrapper.instance().componentDidMount().then(() => {
                expect(wrapper.state('message').title).to.equal('No location data sent yet');
                expect(wrapper.state('message').message).to.be.defined;
            });
        });

        it('should set a failure message it it fails', () => {
            getCoordinatesStub.returns(new Promise((resolve, reject) => {
                reject([]);
            }));
            return wrapper.instance().componentDidMount().then(() => {
                expect(wrapper.state('message').title).to.equal('Error');
                expect(wrapper.state('message').message).to.be.defined;
            });
        });
    });

    describe('on feature click', () => {
        it('should show popup with title and link', () => {
            wrapper.find(DummyComp).prop('onFeatureClick')({
                properties: {
                    title: 'new-title',
                    id: 'test-id'
                },
                coordinates: [2, 2]
            });
            expect(wrapper.state('popup')).to.have.property('show', true);
            expect(wrapper.state('popup')).to.have.property('title', 'new-title');
            expect(wrapper.state('popup')).to.have.property('id', 'test-id');
            expect(wrapper.state('popup').coordinates).to.deep.equal([2, 2]);
        });
    });

    describe('on map click', () => {
        it('should hide popup', () => {
            wrapper.find(DummyComp).prop('onMapClick')();
            expect(wrapper.state('popup')).to.deep.equal({
                show: false
            });
        });
    });

    describe('on refresh click', () => {
        beforeEach(() => {
            getCoordinatesStub.reset();
            getCoordinatesStub.returns({
                then: (cb) => cb([])
            });
        });

        it('should get the location for the devices', () => {
            wrapper.find(DummyComp).prop('onRefresh')();
            expect(getCoordinatesStub).to.have.been.calledOnce;
        });

        it('should not fit the map', () => {
            props.fitMap.reset();
            wrapper.find(DummyComp).prop('onRefresh')();
            expect(props.fitMap).not.to.have.been.calledOnce;
        });
    });

    describe('on load', () => {
        it('should get the location for the devices', () => {
            expect(getCoordinatesStub).to.have.been.calledOnce;
        });
    });
});
