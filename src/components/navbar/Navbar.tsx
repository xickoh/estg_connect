import React from "react";
import { FC } from "react";
import "./Styles.css";

const Navbar: FC = () => {
    return (
        <div id="navbar">
            <a href="/"><img id="logo" src="/assets/logo.svg" /></a>
            <ul>
                <li><a href="#">Oradores</a></li>
                <li><a href="#">Localização</a></li>
                <li><a href="#">Bilhetes</a></li>
            </ul>
        </div>
    );
};

export default Navbar;