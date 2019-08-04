import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Header from './modules/shared/components/header/Header';
import ScansList from './modules/scans/components/ScansList/ScansList';
import ScansEdit from './modules/scans/containers/ScansEdit/ScansEdit';

function App({ scans, users }) {
    const [scansState, setScansState] = useState(scans.map(scan => Object.assign(scan, {
        userName: users.find(user => user.id === scan.scannedByUserId).name,
    })));

    const [sortsState, setSortsState] = useState({
        currentSort: 'name asc',
        sorts: [
            { label: 'Name', property: 'name' },
            { label: 'Username', property: 'userName' },
            { label: 'Min Elevation', property: 'elevationMax' },
            { label: 'Max Elevation', property: 'elevationMin' },
        ],
    });

    const onScanEdited = (newScanData) => {
        const editedIndex = scansState.findIndex(scan => scan.id === newScanData.id);
        const updatedScans = [...scansState]
        updatedScans.splice(editedIndex, 1, newScanData);
        setScansState(() => [...updatedScans]);
    }

    const onScansSorted = (property, direction) => {
        setSortsState(sortsState => Object.assign(sortsState, { currentSort: `${property} ${direction}` }));

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
        <main className="App">
            <Header />

            <ScansEdit users={ users } scan={ scansState[0] } onSubmit={ onScanEdited }></ScansEdit>

            <section className="app-content">
                <ScansList scansState={ scansState } sortsState={ sortsState } onScansSorted={ onScansSorted } />
            </section>
        </main>
    );
}

App.propTypes = {
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

export default App;
