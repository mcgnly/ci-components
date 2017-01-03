import React from 'react';

export default function WidgetLinkMenuButtonOnly(props) {
    return (
        <div className="rDropdownMenu mWCLinkMenu">
            <a href={props.link.address}>
                <button
                    className="rButton rDropdownMenuButton rDropdownMenuButtonNoCaret"
                >
                    GO TO &ldquo;{props.link.name}&rdquo;
                </button>
            </a>
        </div>
    );
};
