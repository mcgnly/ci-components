import React from 'react';

export default function WidgetLinkMenu(props) {
    if (!('links' in props) || props.links.length == 0)
        return null;
    else if (props.links.length === 1)
        return <WidgetLinkMenuButtonOnly link={props.links[0]} />;
    else 
        return <WidgetLinkMenuDropdown {...props} />;
};

const LINK_SHAPE = React.PropTypes.shape({
    name:    React.PropTypes.string.isRequired,
    address: React.PropTypes.string.isRequired
});

WidgetLinkMenu.propTypes = {
    links: React.PropTypes.arrayOf(LINK_SHAPE).isRequired
};

function WidgetLinkMenuButtonOnly(props) {
    return (
        <div className="rDropdownMenu" style={{textAlign: 'center'}}>
            <a href={props.link.address}>
                <button 
                    className="rButton rDropdownMenuButton rDropdownMenuButtonNoCaret"
                >
                    GO TO &ldquo;{props.link.name}&rdquo;
                </button>
            </a>
        </div>
    );
}

const MENU_OPEN_CLASS = 'rDropdownMenuOpen';

class WidgetLinkMenuDropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isMenuOpen: false};

        this.onMenuOpenClick = this.onMenuOpenClick.bind(this);
    }
    
    onMenuOpenClick() {
        this.setState({isMenuOpen: !this.state.isMenuOpen});
    }

    static renderMenuItems(links) {
        return links.map((link)=> 
            <a className="rDropdownMenuItem" href={link.address}>{link.name}</a>
        );
    }

    render() {
        const isOpenClass = ( this.state.isMenuOpen ? MENU_OPEN_CLASS : null );

        return (
            <div className={"rDropdownMenu " + isOpenClass} style={{textAlign: 'center'}}>

                {/* Background screen underneath menu items, closes menu when clicked */}
                <div className="rDropdownMenuBGScreen" onClick={this.onMenuOpenClick}></div>

                <button className="rButton rDropdownMenuButton" onClick={this.onMenuOpenClick}>
                    SELECT A LINK&nbsp;
                </button>

                <div className="rDropdownMenuItemContainer" style={{width: 200}}>
                    {WidgetLinkMenuDropdown.renderMenuItems(this.props.links)}
                </div>
            </div>
        );
    }
}

