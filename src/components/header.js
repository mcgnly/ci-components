import React, { PropTypes } from 'react';
import HumanReadableTimestamp from '../time/humanReadable';

export default function Header({ title, lastMessage, widget, showSettings, onSettingsClick }) {
    const settingsIcon = showSettings ? <i className="fa fa-cog mCWidgetIcon mQaSettings mQAIWidgetSettings" onClick={() => onSettingsClick(widget)}></i> : '';

    return (
        <div>
            <div className="rBoxHeader mOWidgetBoxHeader mCWidgetIcon mQaHeaderSettings" onClick={() => onSettingsClick(widget)}>
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


Header.propTypes = {
    title: PropTypes.string.isRequired,
    lastMessage: PropTypes.instanceOf(Date),
    widget: PropTypes.object,
    showSettings: PropTypes.bool,
    onSettingsClick: PropTypes.func
};
