import React from 'react';
import PropTypes from 'prop-types';

import Header from './modules/shared/components/header/Header';
import ScansList from './modules/scans/containers/ScansList/ScansList';

function App({ scans, users }) {
    return (
        <main className="App">
            <Header />

            <div className="app-content">
                <ScansList scans={scans} users={users} />
            </div>
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
