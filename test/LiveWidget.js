import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

chai.should();
chai.use(sinonChai);

const expect = chai.expect;

import { mount } from 'enzyme';

import React from 'react';

import LiveWidget from '../src/LiveWidget';

import WidgetHeader from '../src/components/header';

let serviceMock;

let MQTTServiceStub = sinon.spy(() => serviceMock);

LiveWidget.__Rewire__('MQTTService', MQTTServiceStub);

class DummyComponent extends React.Component {
    render() {
        return <div></div>;
    }
}

function setup() {
    let props = {
        title: 'test-title',
        devices: [{ id: 'my-id' }, { id: 'my-second-id' }],
        readings: [{
            path: 'my-path', meaning: 'my-meaning',
            valueSchema: {
                maximum: 99,
                minimum: 1,
                unit: 'F'
            }
        }]
    };

    serviceMock = {
        connect: sinon.spy(),
        disconnect: sinon.spy()
    };


    const WrappedComponent = LiveWidget(DummyComponent);

    let wrapper = mount(<WrappedComponent {...props}/>);

    return {
        props,
        wrapper
    };
}

describe('component LiveWidget higher order component', () => {
    let wrapper;
    let props;
    let clock;
    beforeEach(function() {
        clock = sinon.useFakeTimers();
        const setupObj = setup();
        wrapper = setupObj.wrapper;
        props = setupObj.props;
    });

    afterEach(() => {
        clock.restore();
    });

    it('should pass reading, meaning and for all device ids', () => {
        MQTTServiceStub.args.forEach((call, i) => {
            expect(call[0]).to.have.property('id', props.devices[i].id);
            expect(call[0]).to.have.property('path', props.readings[0].path);
            expect(call[0]).to.have.property('meaning', props.readings[0].meaning);
        });
    });

    describe('#render', () => {
        it('should render a header for the widget', () => {
            expect(wrapper.find(WidgetHeader)).to.have.length(1);
        });
    });

    it('should update the state on incoming message', () => {
        MQTTServiceStub.lastCall.args[0].onMessage({ value: 22, lastMessage: new Date(1985, 10, 8, 12, 0) });

        expect(wrapper.state('reading')).to.equal(22);
        expect(wrapper.state('lastMessage').getTime()).to.equal((new Date(1985, 10, 8, 12, 0)).getTime());
    });

    it('should connect when is mounted', () => {
        expect(serviceMock.connect).to.have.been.calledTwice;
    });

    it('should disconnect when it is unmount', () => {
        wrapper.unmount();
        expect(serviceMock.disconnect).to.have.been.calledTwice;
    });

    it('should update currentTime every second', () => {
        expect(wrapper.state('currentTime')).not.to.be.defined;

        clock.tick(1000);
        expect(wrapper.state('currentTime').getTime()).to.equal((new Date()).getTime());
    });

    it('should clear interval on un mount', () => {
        wrapper.unmount();
        clock.tick(2000);

        expect(wrapper.currentTimeInterval).not.to.be.defined;
    });

    it('should not fail if the widget has no config', () => {
        wrapper.setProps({
            widget: {}
        });
        expect(wrapper.find(DummyComponent)).to.have.length(1);
    });

    it('should take the min/max value from the widget config', () => {
        expect(wrapper.find(DummyComponent).prop('min')).to.equal(1);
        expect(wrapper.find(DummyComponent).prop('max')).to.equal(99);
    });

    it('should take the unit from the widget config', () => {
        expect(wrapper.find(DummyComponent).prop('unit')).to.equal('F');
    });

    describe('has links', () => {
        beforeEach(() => {
            wrapper.setProps({
                widget: {
                    config: {
                        links: [{ name: 'test-name', address: 'http://example.com' }]
                    }
                }
            });
        });

        it('should render the link menu', () => {
            expect(wrapper.find('WidgetLinkMenu')).to.have.length(1);
        });
    });

    describe('has no links', () => {
        beforeEach(() => {
            wrapper.setProps({
                widget: {
                    config: {}
                }
            });
        });

        it('should not render the link menu', () => {
            expect(wrapper.find('WidgetLinkMenu')).to.have.length(0);
        });
    });
});
