import React from "react";
import { FC } from "react";
import "./Styles.css";
import Navmenu from "../navmenu/Navmenu";

const Navbar: FC = () => {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    return (
        <>
            <div id="navbar">
                <a href="/"><img id="logo" src="/assets/logo.svg" /></a>
                <ul>
                    <li><a href="#">Oradores</a></li>
                    <li><a href="#">Localização</a></li>
                    <li><button className="tickets">Bilhetes</button></li>
                </ul>
                <button className={"burger-icon"} onClick={() => setIsMenuOpen(true)} />
            </div>
            {(isMenuOpen && <Navmenu closeMenu={() => setIsMenuOpen(false)} />)}
        </>
    );
};

export default Navbar;