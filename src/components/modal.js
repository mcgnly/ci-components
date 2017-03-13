import React, { PropTypes } from 'react';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);

        this.close = this.close.bind(this);

        this.state = {
            close: false
        };
    }

    close() {
        this.setState({
            close: true
        });
    }

    render() {
        if (this.state.close) {
            return null;
        }
        const { title = '', children = '', closeMessage = 'Close' } = this.props;
        return (
            <dialog className="rModal">
                <article className="rModalContent">
                    <div className="rModalTitle"><i onClick={this.close} className="fa fa-times closeIcon mQaClose"></i></div>
                    <h2 className="rTypoHeadingBold">{title}</h2>
                    <div className="rModalBody">
                        {children}
                    </div>
                    <div className="rModalFooter rModalFooterCenter">
                        <button className="rButton rButtonPrimary mQaClose" onClick={this.close}>{closeMessage}</button>
                   </div>
                </article>
            </dialog>
        );
    }
};

Modal.propTypes = {
    title: PropTypes.string,
    closeMessage: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
