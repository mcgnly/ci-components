import React from 'react';

export default function WidgetLinkMenuButtonOnly(props) {
    return (
        <div className="rDropdownMenu mWCLinkMenu">
            <a href={props.link.address} target={props.link.open === 'external' ? '_blank' : ''}>
                <button
                    className="rButton rDropdownMenuButton rDropdownMenuButtonNoCaret"
                >
                    GO TO &ldquo;{props.link.name}&rdquo;
                </button>
            </a>
        </div>
    );
};
