import React, { PropTypes } from 'react';

function getClassName(type) {
    switch (type) {
        case 'delete':
            return 'fa fa-trash rButton rButtonTertiary';
        case 'primary':
            return 'rButton rButtonPrimary';
        case 'secondary':
            return 'rButton rButtonSecondary';
        case 'tertiary':
            return 'rButton rButtonTertiary';
        case 'tertiary-monochrome':
            return 'rButton rButtonTertiaryMonochrome';
        default:
            return 'rButton';
    }
};

function getSize(small) {
    if (small) {
        return 'rButtonSmall';
    } else {
        return '';
    }
}


export default function Button({ onClick: onButtonClick, type, disabled = false, className = '', small = false, innerText = '' }) {
    return (
        <button onClick={onButtonClick} disabled={disabled} className={`${getClassName(type)} ${getSize(small)} ${className}`}>
            {`${type != 'delete' ? innerText : ''}`}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    innerText: PropTypes.string,
    small: PropTypes.bool
};
