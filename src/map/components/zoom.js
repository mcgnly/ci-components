import React from 'react';

export default ({ onZoomIn, onZoomOut }) => {
    return (
        <div className="mCMapZoom">
            <button className="mCMapZoomButton" onClick={onZoomIn}>+</button>
            <button className="mCMapZoomButton" onClick={onZoomOut}>-</button>
        </div>
    );
};
