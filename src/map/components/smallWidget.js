import React from 'react';
import WidgetHeader from '../../components/header';

export default (props) => {
    const { children, type } = props;
    return (
        <li className="rBox rUtilityResetListItem mOFullWidget" data-qai-widget-type={type}>
            <WidgetHeader {...props}/>
            <div className="rBoxBody mCMapSmall">
                {children}
            </div>
        </li>
    );
};
