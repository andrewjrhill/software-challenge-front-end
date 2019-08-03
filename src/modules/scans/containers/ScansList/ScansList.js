import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from 'react-feather';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

import './ScansList.scss'
import ScansListItem from '../../components/ScansListItem/ScansListItem';
import ScansSortButton from '../../components/ScansSortButton/ScansSortButton';

const ScansList = ({ scans, users }) => {
    const [sortState, setSortState] = useState({
        currentSort: 'name asc',
        sorts: [
            { label: 'Name', property: 'name' },
            { label: 'Username', property: 'userName' },
            { label: 'Min Elevation', property: 'elevationMax' },
            { label: 'Max Elevation', property: 'elevationMin' },
        ],
    });

    const [scansState, setScansState] = useState(scans.map(scan => Object.assign(scan, {
        userName: users.find(user => user.id === scan.scannedByUserId).name,
    })));

    const onSortSelected = (property, direction) => {
        setSortState(sortState => Object.assign(sortState, { currentSort: `${property} ${direction}` }));

        if (!property.includes('elevation')) {
            return setScansState(scansState => [...scansState].sort((a, b) => direction === 'asc'
                ? a[property].localeCompare(b[property])
                : b[property].localeCompare(a[property])));
        }

        return setScansState(scansState => [...scansState].sort((a, b) => direction === 'asc'
            ? a[property] - b[property]
            : b[property] - a[property]));
    }

    return (
        <div className="ScansList">
            <div className="scans-actions-wrapper">
                <h1>Scans</h1>

                <p className="results-length">Displaying 1 - { scans.length } of { scans.length } results.</p>

                <Dropdown>
                    <DropdownTrigger>
                        Order by<ChevronDown/>
                    </DropdownTrigger>

                    <DropdownContent>
                        {sortState.sorts.map(sort =>
                            <ul key={ sort.property }>
                                <li>{ sort.label }</li>
                                <li>
                                    <ScansSortButton onClick={ onSortSelected } property={ sort.property } direction='asc' currentSort={ sortState.currentSort } />
                                    <ScansSortButton onClick={ onSortSelected } property={ sort.property } direction='desc' currentSort={ sortState.currentSort } />
                                </li>
                            </ul>
                        )}
                    </DropdownContent>
                </Dropdown>

                <button className="button-primary create-new-scan">new scan</button>
            </div>

            {scansState.map(scan => (
                <ScansListItem
                    elevationMax={ scan.elevationMax }
                    elevationMin={ scan.elevationMin }
                    imageURL={ scan.imageURL }
                    key={ scan.id }
                    name={ scan.name }
                    userName={ scan.userName } />
                ))}
        </div>
    );
}

ScansList.propTypes = {
    scans: PropTypes.arrayOf(PropTypes.shape({
        elevationMax: PropTypes.number,
        elevationMin: PropTypes.number,
        id: PropTypes.number,
        imageURL: PropTypes.string,
        name: PropTypes.string,
        scannedByUserId: PropTypes.number,
    })).isRequired,
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
    })).isRequired,
}

export default ScansList;
