import React from 'react';

export default ({ onRefresh = () => {} }) =>
    <div className="rSectionHeaderBreadcrumb">
        <div></div>
        <div className="rSectionHeaderElement mWCControl">
            <i className="fa fa-refresh mQaRefresh mWCControlItem" onClick={onRefresh}></i>
        </div>
    </div>
;
