import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import React from 'react';

import MapOverviewComponent from '../../../src/map/components/overview';
import BaseMapComponent from '../../../src/map/components/basemap';
import ZoomComponent from '../../../src/map/components/zoom';
import LoadingIcon from '../../../src/icons/loading';
import ControlPanel from '../../../src/components/controlPanel';

import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';

function setup() {
    let props = {
        center: [0, 0],
        points: [
            { coordinates: [1, 1], properties: { title: 'title-1', shorthand: 't' } },
            { coordinates: [2, 2], properties: { title: 'title-2', shorthand: 't' } },
            { coordinates: [3, 3], properties: { title: 'title-3', shorthand: 't' } }
        ],
        popup: {},
        onFeatureClick: sinon.spy(),
        onMapClick: sinon.spy(),
        onRefresh: sinon.spy(),
        onLoad: sinon.spy(),
        onZoomIn: sinon.spy(),
        onZoomOut: sinon.spy()
    };

    let output = shallow(<MapOverviewComponent {...props}/>);

    return {
        props,
        output
    };
}

describe('component <MapOverviewComponent/>', () => {
    let output;
    let props;
    beforeEach(function() {
        const setupObj = setup();
        output = setupObj.output;
        props = setupObj.props;
    });

    it('should render a Map', () => {
        expect(output.find(BaseMapComponent)).to.have.length(1);
    });

    describe('no points', () => {
        it('should show a loading icon', () => {
            output.setProps({
                points: []
            });

            expect(output.find(LoadingIcon)).to.have.length(1);
        });
    });

    describe('has points', () => {
        it('should not show loading icon', () => {
            expect(output.find(LoadingIcon)).to.have.length(0);
        });

        it('should add a feature per point', () => {
            expect(output.find(Feature)).to.have.length(3);
            expect(output.find(Feature).first().prop('coordinates')).to.deep.equal([1, 1]);
        });
    });

    describe('feature', () => {
        it('should call onFeatureClick on feature onClick', () => {
            const firstFeature = output.find(Feature).first();
            firstFeature.simulate('click');
            expect(props.onFeatureClick).to.have.been.calledWith({
                coordinates: [1, 1],
                properties: { title: 'title-1', shorthand: 't' }
            });
        });
    });

    describe('zoom', () => {
        it('should call onZoomIn on onZoomIn', () => {
            output.find(BaseMapComponent).prop('onZoomIn')();
            expect(props.onZoomIn).to.have.been.calledOnce;
        });

        it('should call onZoomIn on onZoomIn', () => {
            output.find(BaseMapComponent).prop('onZoomOut')();
            expect(props.onZoomOut).to.have.been.calledOnce;
        });
    });

    describe('pin layer', () => {
        it('should have pins', () => {
            expect(output.find('Layer[id="marker"]').prop('layout')).to.deep.equal({ 'icon-image': 'pin' });
        });

        it('should have a feature per point', () => {
            const markerLayer = output.find('Layer[id="marker"]');
            expect(markerLayer.find(Feature)).to.have.length(3);
        });
    });

    describe('counter layer', () => {
        it('filter out less than 2 data points', () => {
            expect(output.find('Layer[id="cluster-count"]').prop('layerOptions').filter).to.deep.equal(['>=', 'point_count', 2]);
        });

        it('render the point_count', () => {
            expect(output.find('Layer[id="cluster-count"]').prop('layout')['text-field']).to.equal('{point_count}');
        });

        it('should have a feature per point', () => {
            const counterLayer = output.find('Layer[id="cluster-count"]');
            expect(counterLayer.find(Feature)).to.have.length(3);
        });
    });

    describe('control panel', () => {
        it('should render a control panel with refresh', () => {
            expect(output.find(ControlPanel)).to.have.length(1);
        });

        it('should pass props to the control panel', () => {
            expect(output.find(ControlPanel).prop('onRefresh')).to.equal(props.onRefresh);
        });
    });

});
