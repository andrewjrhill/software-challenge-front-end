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
            <div className="App">
                <Header />
                <ScansList scans={this.state.scans} users={this.state.users} />
            </div>
        );
    }
}

export default App;
