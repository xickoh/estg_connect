import React from "react";
import { FC } from "react";
import "./Styles.css";

const Footer: FC = () => {
    return (
        <div id="footer">
            <a href="/"><img id="logo" src="/assets/logo.svg" /></a>
            <h3>O evento de tecnologia da ESTG - IPP</h3>
            <ul>
                <li><a href="#">Oradores</a></li>
                <li><a href="#">Localização</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Contactar</a></li>
                <li><a href="#">Participar</a></li>
            </ul>
            <hr/>
            <h3>© 2026 ESTG Connect. Todos os direitos reservados</h3>
        </div>
    );
};

export default Footer;