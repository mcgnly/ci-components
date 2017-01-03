import React from 'react';

import WidgetLinkMenuButtonOnly from './buttonOnly';
import WidgetLinkMenuDropdown from './dropdown';

export default function WidgetLinkMenu(props) {
    const { links } = props;
    if (!links || links.length == 0) {
        return null;
    } else if (links.length === 1) {
        return <WidgetLinkMenuButtonOnly link={links[0]} />;
    } else {
        return <WidgetLinkMenuDropdown {...props} />;
    }
};

const LINK_SHAPE = React.PropTypes.shape({
    name:    React.PropTypes.string.isRequired,
    address: React.PropTypes.string.isRequired
});

WidgetLinkMenu.propTypes = {
    links: React.PropTypes.arrayOf(LINK_SHAPE).isRequired
};
