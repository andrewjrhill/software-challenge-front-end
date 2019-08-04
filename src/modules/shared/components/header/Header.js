import React from "react";
import "./Header.scss";
import logo from "../../../../images/logo.png";

const Header = () => {
    return (
        <header className="header">
            <div className="content-wrapper">
                <img src={logo} alt="Imerso Front-End Challenge" />
            </div>
        </header>
    );
};

export default Header;
