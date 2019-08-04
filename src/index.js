import React from "react";
import ReactDOM from "react-dom";

import { createScanData, createUserData } from "./data";

import App from "./App";
import "./styles/index.scss";

const state = {
    scans: createScanData(),
    users: createUserData()
};

function render() {
    ReactDOM.render(<App {...state} />, document.getElementById("root"));
}

render();
