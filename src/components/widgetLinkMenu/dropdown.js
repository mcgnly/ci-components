import React from 'react';

const MENU_OPEN_CLASS = 'rDropdownMenuOpen';

export default class WidgetLinkMenuDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isMenuOpen: false };

        this.onMenuOpenClick = this.onMenuOpenClick.bind(this);
    }

    onMenuOpenClick() {
        this.setState({ isMenuOpen: !this.state.isMenuOpen });
    }

    static renderMenuItems(links) {
        return links.map(({ name, address, open })=>
            <a className="rDropdownMenuItem" key={`widget-menu-link-${name}`} href={address} target={open === 'external' ? '_blank' : ''}>{name}</a>
        );
    }

    render() {
        const isOpenClass = (this.state.isMenuOpen ? MENU_OPEN_CLASS : '');

        return (
            <div className={`rDropdownMenu mWCLinkMenu mWCLinkMenuDropDown ${isOpenClass}`} style={{ textAlign: 'center' }}>

                {/* Background screen underneath menu items, closes menu when clicked */}
                <div className="rDropdownMenuBGScreen" onClick={this.onMenuOpenClick}></div>

                <button className="rButton rDropdownMenuButton" onClick={this.onMenuOpenClick}>
                    SELECT A LINK&nbsp;
                </button>

                <div className="rDropdownMenuItemContainer">
                    {WidgetLinkMenuDropdown.renderMenuItems(this.props.links)}
                </div>
            </div>
        );
    }
}
