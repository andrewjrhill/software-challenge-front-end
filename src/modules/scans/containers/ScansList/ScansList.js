import React from 'react';
import PropTypes from 'prop-types';
import { ChevronDown } from 'react-feather';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

import './ScansList.scss'
import ScansListItem from '../../components/ScansListItem/ScansListItem';

import ScansSortButton from '../../components/ScansSortButton/ScansSortButton';

class ScansList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            scans: this.props.scans.map(scan => Object.assign(scan, {
                userName: this.props.users.find(user => user.id === scan.scannedByUserId).name,
            })),
        };
    }

    onSortSelected(property, direction) {
        if (!property.includes('elevation')) {
            return this.state.scans.sort((a, b) => direction === 'asc'
                ? a[property].localeCompare(b[property])
                : b[property].localeCompare(a[property]));
        }

        return this.state.scans.sort((a, b) => direction === 'asc'
            ? a[property] - b[property]
            : b[property] - a[property]);
    }

    render() {
        return (
            <div className="ScansList">
                <div className="scans-actions-wrapper">
                    <h1>Scans</h1>

                    <p className="results-length">Displaying 1 - { this.props.scans.length } of { this.props.scans.length } results.</p>

                    <Dropdown>
                        <DropdownTrigger>
                            Order by<ChevronDown/>
                        </DropdownTrigger>

                        <DropdownContent>
                            <ul>
                                <li>Name</li>
                                <li>
                                    <ScansSortButton onClick={ this.onSortSelected } property='name' direction='asc' />
                                    <ScansSortButton onClick={ this.onSortSelected } property='name' direction='desc' />
                                </li>
                            </ul>

                            <ul>
                                <li>Username</li>
                                <li>
                                    <ScansSortButton onClick={ this.onSortSelected } property='username' direction='asc' />
                                    <ScansSortButton onClick={ this.onSortSelected } property='username' direction='desc' />
                                </li>
                            </ul>

                            <ul>
                                <li>Min Elevation</li>
                                <li>
                                    <ScansSortButton onClick={ this.onSortSelected } property='elevationMin' direction='asc' />
                                    <ScansSortButton onClick={ this.onSortSelected } property='elevationMin' direction='desc' />
                                </li>
                            </ul>

                            <ul>
                                <li>Max Elevation</li>
                                <li>
                                    <ScansSortButton onClick={ this.onSortSelected } property='elevationMax' direction='asc' />
                                    <ScansSortButton onClick={ this.onSortSelected } property='elevationMax' direction='desc' />
                                </li>
                            </ul>
                        </DropdownContent>
                    </Dropdown>

                    <button className="button-primary create-new-scan">new scan</button>
                </div>

                {this.state.scans.map(scan => (
                    <ScansListItem
                        elevationMax={ scan.elevationMax }
                        elevationMin={ scan.elevationMin }
                        imageURL={ scan.imageURL }
                        key={ scan.id }
                        name={ scan.name }
                        userName={ this.props.users.find(user => user.id === scan.scannedByUserId).name } />
                    ))}
            </div>
        );
    }
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
