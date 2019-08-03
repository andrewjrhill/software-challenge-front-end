import React from 'react';
import './ScansList.scss'
import ScansListItem from '../scans-list-item-component/ScansListItem';

class ScansList extends React.Component {
    render() {
        return (
            <div>
                <div className="Header">
                    Scans:
                </div>

                <div className="ScansList">
                    {this.props.scans.map(scan => (
                        <ScansListItem
                            elevationMax = { scan.elevationMax }
                            elevationMin = { scan.elevationMin }
                            imageURL = { scan.imageURL }
                            key = { scan.id }
                            name = { scan.name }
                            userName = { this.props.users.find(user => user.id === scan.scannedByUserId).name } />
                    ))}
                </div>
            </div>
        );
    }
}

export default ScansList;
