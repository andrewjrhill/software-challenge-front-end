import React from 'react';
import { Edit } from 'react-feather';

import './ScansListItem.scss'
import PropTypes from 'prop-types';

const ScansListItem = ({ elevationMax, elevationMin, imageURL, name, userName }) => {
    return (
        <div className="scans-list-item">
            <div className="image-wrapper">
                <div className="overlay">&nbsp;</div>

                <Edit className="overlay-icon" />

                <img src={ imageURL } alt={ name } />
            </div>

            <h2>{ name }</h2>

            <ul>
                <li className="username">
                    <span>Scanned by</span>
                    { userName }
                </li>

                <li className="min-elevation">
                    <span>Min elevation</span>
                    { elevationMin }
                </li>

                <li className="max-elevation">
                    <span>Max elevation</span>
                    { elevationMax }
                </li>

                <li className="mobile-elevation">
                    <span>Elevations</span>
                    { elevationMin } - { elevationMax }
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
