import React, { PropTypes } from 'react';


ControlPanel.propTypes = {
    onRefresh: PropTypes.func,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func
};

export default function ControlPanel({ onRefresh = () => {}, onAdd = () => {} }) {
    return (
        <div className="rSectionHeaderBreadcrumb">
            <div></div>
            <div className="rSectionHeaderElement mWCControl">
                <i className="fa fa-refresh mQaControlPanelRefresh mWCControlItem" onClick={onRefresh}></i>
                <i className="fa fa-plus mQaControlPanelAdd mWCControlItem" onClick={onAdd}></i>
            </div>
        </div>
    );
};
