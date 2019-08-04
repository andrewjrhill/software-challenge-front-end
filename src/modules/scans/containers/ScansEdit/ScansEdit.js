import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { XCircle } from 'react-feather';

import './ScansEdit.scss'

const ScansEdit = props => {
    const { users, scan, active, onSubmit, onCloseEditForm, onDelete } = props;

    const classes = classnames({
        ScansEdit: true,
        active,
    });

    const [elevationMax, setElevationMax] = useState(scan.elevationMax || 0);
    const [elevationMin, setElevationMin] = useState(scan.elevationMin || 0);
    const [id, setId] = useState(scan.id || 0);
    const [name, setName] = useState(scan.name || '');
    const [scannedByUserId, setScannedByUserId] = useState(scan.scannedByUserId || 0);
    const [userName, setUserName] = useState(scan.userName || '');

    const formData = {
        elevationMax: parseFloat(elevationMax),
        elevationMin: parseFloat(elevationMin),
        id: parseInt(id),
        imageURL: scan.imageURL,
        name,
        scannedByUserId: parseInt(scannedByUserId),
        userName,
    };

    useEffect(() => {
        setElevationMax(props.scan.elevationMax || 0);
        setElevationMin(props.scan.elevationMin || 0);
        setId(props.scan.id || 0);
        setName(props.scan.name || '');
        setScannedByUserId(props.scan.scannedByUserId || 0);
        setUserName(props.scan.userName || '');
    }, [props.users, props.scan, props.active, props.onSubmit]);

    return (
        <div className={ classes }>
            <form>
                <h2>Edit Scan</h2>

                <button className="close-button" onClick={ e => { e.preventDefault(); onCloseEditForm(); } }><XCircle /></button>

                <label>
                    Name:
                    <input type="text" name="name" value={ name } onChange={ e => setName(e.target.value) } />
                </label>

                <label>
                    Elevation Min:
                    <input type="number" name="elevationMin" step="0.01" value={ elevationMin } onChange={ e => setElevationMin(e.target.value) } />
                </label>

                <label>
                    Elevation Max:
                    <input type="number" name="elevationMax" step="0.01" value={ elevationMax } onChange={ e => setElevationMax(e.target.value) } />
                </label>

                <label>
                    Scanned By:
                    <select value={ scannedByUserId } onChange={ e => { setScannedByUserId(Number(e.target.value)); setUserName(users.find(user => user.id === Number(e.target.value)).name) } }>
                        { users.map((user, i) => <option key={ i } value={ user.id }>{ user.name }</option>) }
                    </select>
                </label>

                <div className="button-wrapper">
                    <button className="button-primary" onClick={ e => { e.preventDefault(); onSubmit(formData); } }>Update</button>
                    <button className="button-primary danger" onClick={ e => { e.preventDefault(); onDelete(id); } }>Delete</button>
                </div>
            </form>
        </div>
    );
}

ScansEdit.propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
    })),
    scan: PropTypes.shape({
        elevationMax: PropTypes.number,
        elevationMin: PropTypes.number,
        id: PropTypes.number,
        imageURL: PropTypes.string,
        name: PropTypes.string,
        scannedByUserId: PropTypes.number,
    }),
    active: PropTypes.bool,
    onSubmit: PropTypes.func,
    onCloseEditForm: PropTypes.func,
    onDelete: PropTypes.func,
}

export default ScansEdit;
