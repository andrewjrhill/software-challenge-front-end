import React from 'react';
import PropTypes from 'prop-types';
import { ChevronsUp, ChevronsDown } from 'react-feather';

import './ScansSortButton.scss';

function ScansSortButton({ onClick, property, direction }) {
    return (<button className="ScansSortButton" onClick={ () => { onClick(property, direction) }}>
        { direction && direction === 'asc' ? <span>Ascending <ChevronsUp /></span> : null }
        { direction && direction === 'desc' ? <span>Descending <ChevronsDown /></span> : null }
    </button>);
}

ScansSortButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    property: PropTypes.string.isRequired || PropTypes.number.isRequired,
    direction: PropTypes.string.isRequired,
}

export default ScansSortButton;
