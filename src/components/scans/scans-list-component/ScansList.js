import React from 'react';
import './ScansList.scss'
import ScansListItem from '../scans-list-item-component/ScansListItem';

class ScansList extends React.Component {
    scansLength = this.props.scans.length;

    render() {
        return (
            <div className="ScansList">
                <h1>Scans</h1>
                <p className="results-length">Displaying 1 - { this.scansLength } of { this.scansLength } results.</p>


                {this.props.scans.map(scan => (
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
