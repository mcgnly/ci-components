import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

import React from 'react';

import SimpleRedirect from '../../src/simpleRedirect';
import LoadingIcon from '../../src/icons/loading';

const redirectSpy = sinon.spy();
SimpleRedirect.__Rewire__('Service', {
    redirect: redirectSpy
});

function setup() {
    let props = {
        redirectMethod: sinon.spy(),
        type: 'healthcheck',
        config: {
            healthcheckId: 'my-healthcheck-id'
        }
    };

    let wrapper = mount(<SimpleRedirect {...props}/>);

    return {
        props,
        wrapper
    };
}

describe('<SimpleRedirect/> widget', () => {
    let wrapper;
    let props;
    beforeEach(function() {
        const setupObj = setup();
        wrapper = setupObj.wrapper;
        props = setupObj.props;
    });

    describe('#render', () => {
        it('should render a LoadingIcon components', () => {
            expect(wrapper.find(LoadingIcon)).to.have.length(1);
        });
    });

    describe('on load', () => {
        it('should load url from service based on type', () => {
            expect(redirectSpy).to.have.been.calledWith('healthcheck', {
                healthcheckId: 'my-healthcheck-id'
            }, props.redirectMethod);
        });
    });
});
