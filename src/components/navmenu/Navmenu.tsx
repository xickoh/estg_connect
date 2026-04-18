import React from "react";
import { FC } from "react";
import "./Styles.css";

interface NavmenuProps {
    closeMenu: () => void;
}

const Navmenu: FC<NavmenuProps> = (props) => {

    const { closeMenu } = props;

    return (
        <div id="navmenu">
            <button className="close-button" onClick={closeMenu} />
            <ul>
                <li><a href="#">Oradores</a></li>
                <li><a href="#">Localização</a></li>
                <li><button>Bilhetes</button></li>
            </ul>
        </div>
    );
};

export default Navmenu;