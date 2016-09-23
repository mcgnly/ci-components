import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import React from 'react';

import MapBaseComponent from '../../../src/map/components/basemap';
import ZoomComponent from '../../../src/map/components/zoom';

import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';

function setup() {
    let props = {
        center: [0, 0],
        popup: {},
        onFeatureClick: sinon.spy(),
        onMapClick: sinon.spy(),
        onLoad: sinon.spy(),
        onZoomIn: sinon.spy(),
        onZoomOut: sinon.spy()
    };

    let output = shallow(<MapBaseComponent {...props}/>);

    return {
        props,
        output
    };
}

describe('component <MapBaseComponent/>', () => {
    let output;
    let props;
    beforeEach(function() {
        const setupObj = setup();
        output = setupObj.output;
        props = setupObj.props;
    });

    it('should render a Map', () => {
        expect(output.find('ReactMapboxGl')).to.have.length(1);
    });

    it('should center the provided center', () => {
        expect(output.find('ReactMapboxGl').prop('center')).to.deep.equal([0, 0]);
    });

    it('should call onMapClick when clicking on the map', () => {
        output.find('ReactMapboxGl').simulate('click');
        expect(props.onMapClick).to.have.been.calledWith();
    });

    describe('onStyleLoad', () => {
        it('should call onLoad with the map instance', () => {
            output.find('ReactMapboxGl').prop('onStyleLoad')({ id: 'my-map-id' });
            expect(props.onLoad).to.have.been.calledWith({ id: 'my-map-id' });
        });
    });

    describe('zoom', () => {
        it('should call onZoomIn on onZoomIn', () => {
            output.find(ZoomComponent).prop('onZoomIn')();
            expect(props.onZoomIn).to.have.been.calledOnce;
        });

        it('should call onZoomIn on onZoomIn', () => {
            output.find(ZoomComponent).prop('onZoomOut')();
            expect(props.onZoomOut).to.have.been.calledOnce;
        });
    });
});
