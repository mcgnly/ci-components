import React from 'react';
import  HumanReadableTimestamp from '../time/humanReadable';

export default ({ title, lastMessage, widget, showSettings, onSettingsClick }) => {
    const settingsIcon = showSettings ? <i className="fa fa-cog mCWidgetIcon mQaSettings mQAIWidgetSettings" onClick={() => onSettingsClick(widget)}></i> : '';
    return (
        <div>
            <div className="rBoxHeader">
                <span>
                    <div>{title}</div>
                    <div className="rTypoRegular"><HumanReadableTimestamp timestamp={lastMessage}/></div>
                </span>
                <span>
                    {settingsIcon}
                </span>
            </div>
        </div>
    );
};
