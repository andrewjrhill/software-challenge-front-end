import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { ChevronsUp, ChevronsDown } from "react-feather";

import "./ScansSortButton.scss";

const ScansSortButton = ({ onClick, property, direction, currentSort }) => {
    const classes = classnames({
        ScansSortButton: true,
        active: currentSort === `${property} ${direction}` ? true : false
    });

    return (
        <button
            className={classes}
            onClick={() => {
                onClick(property, direction);
            }}
        >
            {direction && direction === "asc" ? (
                <span>
                    Ascending <ChevronsUp />
                </span>
            ) : direction === "desc" ? (
                <span>
                    Descending <ChevronsDown />
                </span>
            ) : null}
        </button>
    );
};

ScansSortButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    property: PropTypes.string.isRequired || PropTypes.number.isRequired,
    direction: PropTypes.string.isRequired,
    currentSort: PropTypes.string.isRequired
};

export default ScansSortButton;
