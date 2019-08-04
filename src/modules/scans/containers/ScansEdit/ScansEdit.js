import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './ScansEdit.scss'

const ScansEdit = ({ users, scan, onSubmit }) => {
    const [elevationMax, setElevationMax] = useState(scan ? scan.elevationMax : 0);
    const [elevationMin, setElevationMin] = useState(scan ? scan.elevationMin : 0);
    const [name, setName] = useState(scan ? scan.name : '');
    const [userId, setUserId] = useState(scan ? scan.scannedByUserId : '');
    const [userName, setUserName] = useState(scan ? scan.userName : '');

    const formData = () => ({
        elevationMax: parseFloat(elevationMax),
        elevationMin: parseFloat(elevationMin),
        id: parseInt(scan.id),
        imageURL: scan.imageURL,
        name,
        scannedByUserId: parseInt(userId),
        userName,
    });

    return (
        <div className="ScansEdit">
            <form onSubmit={ e => { e.preventDefault(); onSubmit(formData()); } }>
                <h2>Edit Scan</h2>

                <label>
                    Name:
                    <input type="text" name="name" value={ name } onChange={ e => setName(e.target.value) } />
                </label>

                <label>
                    Elevation Min:
                    <input type="number" name="elevationMin" value={ elevationMin } onChange={ e => setElevationMin(e.target.value) } />
                </label>

                <label>
                    Elevation Max:
                    <input type="number" name="elevationMax" value={ elevationMax } onChange={ e => setElevationMax(e.target.value) } />
                </label>

                <label>
                    Scanned By:
                    <select value={ userId } onChange={ e => { setUserId(Number(e.target.value)); setUserName(users.find(user => user.id === Number(e.target.value)).name) } }>
                        { users.map(user => <option
                            key={ user.id }
                            value={ user.id }>{ user.name }</option>) }
                    </select>
                </label>

                <input className="button-primary" type="submit" value="Submit" />
            </form>
        </div>
    );
}

ScansEdit.propTypes = {
    scan: PropTypes.shape({
        elevationMax: PropTypes.number,
        elevationMin: PropTypes.number,
        id: PropTypes.number,
        imageURL: PropTypes.string,
        name: PropTypes.string,
        scannedByUserId: PropTypes.number,
    }),
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
    })).isRequired,
    onSubmit: PropTypes.func.isRequired,
}

export default ScansEdit;
