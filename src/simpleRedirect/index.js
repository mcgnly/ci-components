import React from 'react';

import LoadingIcon from '../icons/loading';

import Service from './service';

export default class SimpleRedirectContainer extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const { redirectMethod, type, config } = this.props;

        Service.redirect(type, config, redirectMethod);
    }
    render() {
        return <LoadingIcon/>;
    }
}
