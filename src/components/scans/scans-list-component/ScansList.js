import React from 'react';
import './ScansList.scss'
import ScansListItem from '../scans-list-item-component/ScansListItem';

class ScansList extends React.Component {
    scansLength = this.props.scans.length;

    /**
     * Sort scans by property and direction.
     * @param { string } property
     * Accepts "name", "elevation" or "username". Determines which property to sort scans by.
     * @param { string } direction
     * Accepts "asc" or "desc". Determines the direction in which to sort the scans.
     * @param { array } scans
     * Accepts an array of "scans" to sort.
     */
    sortBy(property, direction, scans) {
        if (!property.includes('elevation')) {
            return scans.sort((a, b) => direction === 'asc'
                ? a[property].localeCompare(b[property])
                : b[property].localeCompare(a[property]));
        }

        return scans.sort((a, b) => direction === 'asc'
            ? a[property] - b[property]
            : b[property] - a[property]);
    }

    render() {
        return (
            <div className="ScansList">
                <h1>Scans</h1>
                <p className="results-length">Displaying 1 - { this.scansLength } of { this.scansLength } results.</p>

                {this.sortBy('name', 'asc', this.props.scans).map(scan => (
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
