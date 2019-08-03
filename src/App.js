import React, {Component} from 'react';

import { createScanData, createUserData } from './data';

import Header from './components/shared/header/Header';
import ScansList from './components/scans/scans-list-component/ScansList';

class App extends Component {
    state = {
        scans: createScanData(),
        users: createUserData(),
    };

    render() {
        return (
            <main className="App">
                <Header />

                <div className="app-content">
                    <ScansList scans={this.state.scans} users={this.state.users} />
                </div>
            </main>
        );
    }
}

export default App;
