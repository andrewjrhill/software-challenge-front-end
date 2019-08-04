import React from "react";
import PropTypes from "prop-types";
import { ChevronDown } from "react-feather";
import Dropdown, {
    DropdownTrigger,
    DropdownContent
} from "react-simple-dropdown";

import "./ScansList.scss";
import ScansListItem from "../ScansListItem/ScansListItem";
import ScansSortButton from "../ScansSortButton/ScansSortButton";

const ScansList = ({
    scansState,
    sortsState,
    onScansSorted,
    onStartScanUpdate
}) => {
    return (
        <div className="ScansList">
            <div className="scans-actions-wrapper">
                <h1>Scans</h1>

                <p className="results-length">
                    Displaying {scansState.length} results.
                </p>

                <Dropdown>
                    <DropdownTrigger>
                        Order by
                        <ChevronDown />
                    </DropdownTrigger>

                    <DropdownContent>
                        {sortsState.sorts.map(sort => (
                            <ul key={sort.property}>
                                <li>{sort.label}</li>
                                <li>
                                    <ScansSortButton
                                        onClick={onScansSorted}
                                        property={sort.property}
                                        direction="asc"
                                        currentSort={sortsState.currentSort}
                                    />
                                    <ScansSortButton
                                        onClick={onScansSorted}
                                        property={sort.property}
                                        direction="desc"
                                        currentSort={sortsState.currentSort}
                                    />
                                </li>
                            </ul>
                        ))}
                    </DropdownContent>
                </Dropdown>

                <button
                    className="button-primary create-new-scan"
                    onClick={() => onStartScanUpdate({}, true)}
                >
                    new scan
                </button>
            </div>

            {scansState.map(scan => (
                <ScansListItem
                    elevationMax={scan.elevationMax}
                    elevationMin={scan.elevationMin}
                    id={scan.id}
                    imageURL={scan.imageURL}
                    key={scan.id}
                    name={scan.name}
                    scannedByUserId={scan.scannedByUserId}
                    userName={scan.userName}
                    onClick={onStartScanUpdate}
                />
            ))}
        </div>
    );
};

ScansList.propTypes = {
    scansState: PropTypes.arrayOf(
        PropTypes.shape({
            elevationMax: PropTypes.number,
            elevationMin: PropTypes.number,
            id: PropTypes.number,
            imageURL: PropTypes.string,
            name: PropTypes.string,
            scannedByUserId: PropTypes.number
        })
    ).isRequired,
    sortsState: PropTypes.shape({
        currentSort: PropTypes.string,
        sorts: PropTypes.arrayOf(
            PropTypes.shape({
                label: PropTypes.string,
                property: PropTypes.string
            })
        )
    }),
    onScansSorted: PropTypes.func.isRequired,
    onStartScanUpdate: PropTypes.func.isRequired
};

export default ScansList;
