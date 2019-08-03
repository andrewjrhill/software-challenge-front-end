import React from 'react';
import './ScansListItem.scss'
import PropTypes from 'prop-types';
import { MoreVertical } from 'react-feather';

function ScansListItem(props) {
    return (
        <div className="scans-list-item">
            <div className="image-wrapper">
                <img src={ props.imageURL } alt={ props.name } />
            </div>

            <div className="scan-details">
                <h2>{ props.name }</h2>

                <button>
                    <MoreVertical />
                </button>

                <ul>
                    <li>
                        <span className="label">Scanned by</span>
                        { props.userName }
                    </li>

                    <li>
                        <span className="label">Max elevation</span>
                        { props.elevationMax }
                    </li>

                    <li>
                        <span className="label">Min elevation</span>
                        { props.elevationMin }
                    </li>
                </ul>
            </div>
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
