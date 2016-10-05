import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import React from 'react';

import SmallWidget from '../../../src/map/components/smallWidget';
import WidgetHeader from '../../../src/components/header';

class Child extends React.Component {
    render() {
        return (<div></div>);
    }
}
function setup() {
    let props = {
        children: [<Child key={0}/>, <Child key={1}/>],
        title: 'small title'
    };

    let output = shallow(<SmallWidget {...props}/>);

    return {
        props,
        output
    };
}

describe('component <SmallWidgetComponent/>', () => {
    let output;
    let props;
    beforeEach(function() {
        const setupObj = setup();
        output = setupObj.output;
        props = setupObj.props;
    });

    it('should be a fullSize widget', () => {
        expect(output.find('.mOFullWidget')).to.have.length(1);
    });

    it('should render a <WidgetHeader/> with title', () => {
        expect(output.find(WidgetHeader)).to.have.length(1);
        expect(output.find(WidgetHeader).prop('title')).to.equal('small title');
    });

    it('should render the children', () => {
        expect(output.find(Child)).to.have.length(2);
    });
});
