import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

import React from 'react';

import HigherOrderMapContainer from '../../../src/map/containers/mapcontainer';

class DummyComp extends React.Component {
    render() {
        return (<div></div>);
    }
};

const Container = HigherOrderMapContainer(DummyComp);

function setup() {
    let props = {};

    let wrapper = mount(<Container {...props}/>);

    return {
        props,
        wrapper
    };
}

describe('widget higer order map container', () => {
    let wrapper;
    beforeEach(function() {
        wrapper = setup().wrapper;
    });

    it('should render the <ComposedComponent/> component', () => {
        expect(wrapper.find(DummyComp)).to.have.length(1);
    });

    describe('on map load', () => {
        it('should store reference to the map instance', () => {
            wrapper.find(DummyComp).prop('onMapLoad')({ id: 'my-map-instance', fitBounds: () => {} });
            expect(wrapper.instance().map.id).to.equal('my-map-instance');
        });
    });

    describe('#fitMap', () => {
        it('should wrap on fit to bounds on ', () => {
            const fitBoundsSpy = sinon.spy();
            wrapper.find(DummyComp).prop('fitMap')([{
                coordinates: [1, 1]
            }], {
                fitBounds: fitBoundsSpy
            });
            expect(fitBoundsSpy).to.have.been.calledOnce;
        });
    });

    describe('on zoom in/out', () => {
        beforeEach(() => {
            wrapper.instance().map = {
                setZoom: sinon.spy(),
                getZoom: () => 3.3
            };
        });
        it('should increase zoom state on zoom in', () => {
            wrapper.find(DummyComp).prop('onZoomIn')();
            expect(wrapper.instance().map.setZoom).to.have.been.calledWith(4.3);
        });

        it('should decrease zoom state on zoom out', () => {
            wrapper.find(DummyComp).prop('onZoomOut')();
            expect(wrapper.instance().map.setZoom).to.have.been.calledWith(2.3);
        });
    });

});
