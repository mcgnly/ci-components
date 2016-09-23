import React from 'react';
import  HumanReadableTimestamp from '../time/humanReadable';

export default ({ title, lastMessage, showSettings, onSettingsClick }) => {
    const settingsIcon = showSettings ? <i className="fa fa-cog mCWidgetIcon mQaSettings" onClick={onSettingsClick}></i> : '';
    return (
        <div className="rBoxHeader">
            {title}
            <span>
                <HumanReadableTimestamp timestamp={lastMessage}/>
                {settingsIcon}
            </span>
        </div>
    );
};
