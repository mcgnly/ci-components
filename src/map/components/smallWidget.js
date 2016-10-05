import React from 'react';
import WidgetHeader from '../../components/header';

export default (props) => {
    const { children } = props;
    return (
        <li className="rBox rUtilityResetListItem mOFullWidget">
            <WidgetHeader {...props}/>
            <div className="rBoxBody mCMapSmall">
                {children}
            </div>
        </li>
    );
};
