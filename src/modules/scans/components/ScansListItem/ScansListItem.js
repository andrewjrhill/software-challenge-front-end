import React from 'react';
import { MoreVertical, Layers } from 'react-feather';

import './ScansListItem.scss'
import PropTypes from 'prop-types';

const ScansListItem = props => {
    return (
        <div className="scans-list-item">
            <div className="image-wrapper">
                <div className="overlay">&nbsp;</div>

                <Layers className="overlay-icon" />

                <img src={ props.imageURL } alt={ props.name } />
            </div>

            <h2>{ props.name }</h2>

            <button>
                <MoreVertical />
            </button>

            <ul>
                <li className="username">
                    <span>Scanned by</span>
                    { props.userName }
                </li>

                <li className="min-elevation">
                    <span>Min elevation</span>
                    { props.elevationMin }
                </li>

                <li className="max-elevation">
                    <span>Max elevation</span>
                    { props.elevationMax }
                </li>

                <li className="mobile-elevation">
                    <span>Elevations</span>
                    { props.elevationMin } - { props.elevationMax }
                </li>
            </ul>
        </div>
    );
}

ScansListItem.propTypes = {
    elevationMax: PropTypes.number.isRequired,
    elevationMin: PropTypes.number.isRequired,
    imageURL: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
}

export default ScansListItem;
