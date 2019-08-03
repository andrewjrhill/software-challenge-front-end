import React from 'react';
import { ChevronDown, ChevronsUp, ChevronsDown } from 'react-feather';
import Dropdown, { DropdownTrigger, DropdownContent } from 'react-simple-dropdown';

import './ScansList.scss'
import ScansListItem from '../../components/ScansListItem/ScansListItem';

class ScansList extends React.Component {
    scansLength = this.props.scans.length;

    constructor(props) {
        super(props);
        this.state = {
            scans: this.props.scans.map(scan => Object.assign(scan, {
                userName: this.props.users.find(user => user.id === scan.scannedByUserId).name,
            })),
        };
    }

    /**
     * Sort scans by property and direction.
     * @param { string } property
     * Accepts "name", "elevationMin", "elevationMax" or "username". Determines which property to sort scans by.
     * @param { string } direction
     * Accepts "asc" or "desc". Determines the direction in which to sort the scans.
     */
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

                    <p className="results-length">Displaying 1 - { this.scansLength } of { this.scansLength } results.</p>

                    <Dropdown>
                        <DropdownTrigger>
                            Order by<ChevronDown/>
                        </DropdownTrigger>

                        <DropdownContent>
                            <ul>
                                <li>Name</li>
                                <li>
                                    <button onClick={ () => { this.setState({ scans: this.onSortSelected('name', 'asc') }) } }>Ascending <ChevronsUp /></button>
                                    <button onClick={ () => { this.setState({ scans: this.onSortSelected('name', 'desc') }) } }>Descending <ChevronsDown /></button>
                                </li>
                            </ul>

                            <ul>
                                <li>Username</li>
                                <li>
                                    <button onClick={ () => { this.setState({ scans: this.onSortSelected('userName', 'asc') }) } }>Ascending <ChevronsUp /></button>
                                    <button onClick={ () => { this.setState({ scans: this.onSortSelected('userName', 'desc') }) } }>Descending <ChevronsDown /></button>
                                </li>
                            </ul>

                            <ul>
                                <li>Min Elevation</li>
                                <li>
                                    <button onClick={ () => { this.setState({ scans: this.onSortSelected('elevationMin', 'asc') }) } }>Ascending <ChevronsUp /></button>
                                    <button onClick={ () => { this.setState({ scans: this.onSortSelected('elevationMin', 'desc') }) } }>Descending <ChevronsDown /></button>
                                </li>
                            </ul>

                            <ul>
                                <li>Max Elevation</li>
                                <li>
                                    <button onClick={ () => { this.setState({ scans: this.onSortSelected('elevationMax', 'asc') }) } }>Ascending <ChevronsUp /></button>
                                    <button onClick={ () => { this.setState({ scans: this.onSortSelected('elevationMax', 'desc') }) } }>Descending <ChevronsDown /></button>
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

export default ScansList;
