import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import React from 'react';

import HistoryListComponent from '../../../src/map/components/historyList';
import Close from '../../../src/map/components/close';
import LoadingIcon from '../../../src/icons/loading';

function setup() {
    let selectedPoint = { coordinates: [9, 9], entered: new Date(), left: new Date() };
    let props = {
        points: [
            { coordinates: [1, 1], entered: new Date(), left: new Date() },
            { coordinates: [2, 2], entered: new Date(), left: new Date() },
            { coordinates: [3, 3], entered: new Date(), left: new Date() },
            selectedPoint
        ],
        selectedPoint,
        onSelect: sinon.spy(),
        onClose: sinon.spy()
    };

    let output = shallow(<HistoryListComponent {...props}/>);

    return {
        props,
        output
    };
}

describe('component <HistoryListComponent/>', () => {
    let output;
    let props;
    beforeEach(function() {
        const setupObj = setup();
        output = setupObj.output;
        props = setupObj.props;
    });

    it('should have a title', () => {
        expect(output.find('.mCHistoryListHeader')).to.have.length(1);
    });

    it('should call onClose propty when close button calls onClose', () => {
        output.find(Close).prop('onClose')();
        expect(props.onClose).to.have.been.calledOnce;
    });

    it('should render each point in the list', () => {
        expect(output.find('.mCHistoryListItem')).to.have.length(4);
    });

    describe('message', () => {
        it('should render a loading icon if the message is loading been provided', () => {
            output.setProps({
                message: 'loading'
            });
            expect(output.find(LoadingIcon)).to.have.length(1);
        });

        it('should render a message container', () => {
            output.setProps({
                message: 'a different message'
            });
            expect(output.find('.mCHistoryListItem').text()).to.equal('a different message');
        });
    });

    it('should render each point with coordinates and data', () => {
        const firstItem = output.find('.mCHistoryListItem').first();
        expect(firstItem.text()).to.have.string('1, 1');
    });

    it('should identify the selected point', () => {
        const selectedPoint = output.find('.mCHistoryListItemSelected');
        expect(selectedPoint.text()).to.have.string('9, 9');
    });

    it('should call onSelected when a item is been clicked', () => {
        output.find('.mCHistoryListItem').first().simulate('click');
        expect(props.onSelect).to.have.been.calledWith(props.points[0]);
    });

});
