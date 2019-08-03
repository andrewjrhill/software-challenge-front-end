import React, {Component} from 'react';
import ScansList from './components/scans/scans-list-component/ScansList';
import { createScanData, createUserData } from './data';

class App extends Component {
    state = {
        scans: createScanData(),
        users: createUserData(),
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    Software Challenge
                </header>
                <ScansList
                    scans={this.state.scans}
                    users={this.state.users}
                />
            </div>
        );
    }
}

export default App;
