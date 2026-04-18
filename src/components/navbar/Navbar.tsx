import React from "react";
import { FC } from "react";
import "./Styles.css";
import Navmenu from "../navmenu/Navmenu";

const Navbar: FC = () => {

    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const hrefsList = <ul>
        <li><a href="#oradores">Oradores</a></li>
        <li><a href="#localisation ">Localização</a></li>
        <li><a href="#registrations" className="tickets">Bilhetes</a></li>
    </ul>;

    return (
        <>
            <div id="navbar">
                <a href="/"><img id="logo" src="/assets/logo.svg" /></a>
                {hrefsList}
                <button className={"burger-icon"} onClick={() => setIsMenuOpen(true)} />
            </div>
            {(isMenuOpen &&
                <Navmenu closeMenu={() => setIsMenuOpen(false)} >
                    {hrefsList}
                </Navmenu>)}
        </>
    );
};

export default Navbar;