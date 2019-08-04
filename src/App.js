import React, { useState } from "react";
import PropTypes from "prop-types";

import Header from "./modules/shared/components/header/Header";
import ScansList from "./modules/scans/components/ScansList/ScansList";
import ScanUpdateModal from "./modules/scans/containers/ScanUpdateModal/ScanUpdateModal";

function App({ scans, users }) {
    const [updateScanState, setUpdateScanState] = useState({
        scan: {},
        active: false,
        isNew: false
    });

    const [scansState, setScansState] = useState(
        scans.map(scan =>
            Object.assign(scan, {
                userName: users.find(user => user.id === scan.scannedByUserId)
                    .name
            })
        )
    );

    const [sortsState, setSortsState] = useState({
        currentSort: "",
        sorts: [
            { label: "Name", property: "name" },
            { label: "Username", property: "userName" },
            { label: "Max Elevation", property: "elevationMax" },
            { label: "Min Elevation", property: "elevationMin" }
        ]
    });

    const onScansSorted = (property, direction) => {
        setSortsState(sortsState =>
            Object.assign(sortsState, {
                currentSort: `${property} ${direction}`
            })
        );

        if (!property.includes("elevation")) {
            return setScansState(scansState =>
                [...scansState].sort((a, b) =>
                    direction === "asc"
                        ? a[property].localeCompare(b[property])
                        : b[property].localeCompare(a[property])
                )
            );
        }

        return setScansState(scansState =>
            [...scansState].sort((a, b) =>
                direction === "asc"
                    ? a[property] - b[property]
                    : b[property] - a[property]
            )
        );
    };

    const onStartScanUpdate = (scan, isNew) => {
        setUpdateScanState(updateScanState => ({
            scan: Object.assign(updateScanState.scan, scan),
            active: true,
            isNew
        }));
    };

    const onCloseUpdateScanModal = () => {
        setUpdateScanState(() => ({ scan: {}, active: false }));
    };

    const onScanUpdateSubmit = newScanData => {
        const updatedScans = [...scansState];
        const updatedIndex = !updateScanState.isNew
            ? scansState.findIndex(scan => scan.id === newScanData.id)
            : scansState.length + 1;

        updatedScans.splice(updatedIndex, 1, newScanData);
        setScansState(() => updatedScans);

        if (sortsState.currentSort !== "") {
            const currentSort = sortsState.currentSort.split(" ");
            onScansSorted(currentSort[0], currentSort[1]);
        }

        onCloseUpdateScanModal();
    };

    const onScanDelete = scanId => {
        const newScansList = scansState.filter(scan => scan.id !== scanId);
        setScansState(() => [...newScansList]);
        onCloseUpdateScanModal();
    };

    return (
        <main className="App">
            <Header />

            <ScanUpdateModal
                users={users}
                scan={updateScanState.scan}
                active={updateScanState.active}
                isNew={updateScanState.isNew}
                scansLength={scansState.length}
                onSubmit={onScanUpdateSubmit}
                onCloseUpdateScanModal={onCloseUpdateScanModal}
                onDelete={onScanDelete}
            ></ScanUpdateModal>

            <section className="app-content">
                <ScansList
                    scansState={scansState}
                    sortsState={sortsState}
                    onScansSorted={onScansSorted}
                    onStartScanUpdate={onStartScanUpdate}
                />
            </section>
        </main>
    );
}

App.propTypes = {
    scans: PropTypes.arrayOf(
        PropTypes.shape({
            elevationMax: PropTypes.number,
            elevationMin: PropTypes.number,
            id: PropTypes.number,
            imageURL: PropTypes.string,
            name: PropTypes.string,
            scannedByUserId: PropTypes.number
        })
    ).isRequired,
    users: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            name: PropTypes.string
        })
    ).isRequired
};

export default App;
