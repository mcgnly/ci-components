import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import React from 'react';

import MapHistoryComponent from '../../../src/map/components/history';
import BaseMapComponent from '../../../src/map/components/basemap';
import ZoomComponent from '../../../src/map/components/zoom';

import ReactMapboxGl, { Layer, Feature, Popup } from 'react-mapbox-gl';

function setup() {
    let selectedPoint = { coordinates: [9, 9] };
    let props = {
        center: [0, 0],
        points: [
            { coordinates: [1, 1], properties: { title: 'title-1', shorthand: 't' } },
            { coordinates: [2, 2], properties: { title: 'title-2', shorthand: 't' } },
            { coordinates: [3, 3], properties: { title: 'title-3', shorthand: 't' } },
            selectedPoint
        ],
        selectedPoint,
        onFeatureClick: sinon.spy(),
        onZoomIn: sinon.spy(),
        onZoomOut: sinon.spy()
    };

    let output = shallow(<MapHistoryComponent {...props}/>);

    return {
        props,
        output
    };
}

describe('component <MapHistoryComponent/>', () => {
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

    describe('visited points layer', () => {
        it('should have a visited points makers', () => {
            expect(output.find('Layer[id="route-makers"]').prop('type')).to.equal('circle');
        });

        it('should have a feature per point expect the selected point', () => {
            const routeMarkersLayer = output.find('Layer[id="route-makers"]');
            expect(routeMarkersLayer.find(Feature)).to.have.length(3);
        });

        it('should on click feature call onFeatureClick', () => {
            const routeMarkersLayer = output.find('Layer[id="route-makers"]');
            const firstFeature = routeMarkersLayer.find(Feature).first();
            firstFeature.simulate('click');
            expect(props.onFeatureClick).to.have.been.calledWith({
                coordinates: [1, 1],
                properties: { title: 'title-1', shorthand: 't' }
            });
        });
    });

    describe('selected point', () => {
        it('should have a selected point makers', () => {
            expect(output.find('Layer[id="selected-marker"]').prop('layout')['icon-image']).to.deep.equal('pin-red');
        });

        it('should have one feature for the the selected point', () => {
            const selectedMarkerLayer = output.find('Layer[id="selected-marker"]');
            expect(selectedMarkerLayer.find(Feature)).to.have.length(1);
            expect(selectedMarkerLayer.find(Feature).prop('coordinates')).to.deep.equal([9, 9]);
        });
    });

    describe('route layer', () => {
        it('should have a line for the route layer', () => {
            expect(output.find('Layer[id="route-line"]').prop('type')).to.equal('line');
        });

        it('should have one feature with all coordinates in order', () => {
            const routeLayer = output.find('Layer[id="route-line"]');
            expect(routeLayer.find(Feature).prop('coordinates')).to.deep.equal([[1, 1], [2, 2], [3, 3], [9, 9]]);
        });
    });

});
