import React from "react";
import { FC } from "react";
import "./Styles.css";

interface NavmenuProps {
    closeMenu: () => void;
    children: React.ReactNode;
}

const Navmenu: FC<NavmenuProps> = (props) => {

    const { closeMenu, children } = props;

    return (
        <div id="navmenu">
            <button className="close-button" onClick={closeMenu} />
            {children}
        </div>
    );
};

export default Navmenu;