import React from 'react';
import './Header.scss';
import logo from '../../../images/logo.png';

function Header() {
    return (
        <div className="header">
            <div className="content-wrapper">
                <img src={ logo } alt="Imerso Front-End Challenge" />
            </div>
        </div>
    );
}

export default Header;
