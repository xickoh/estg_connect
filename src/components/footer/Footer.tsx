import React from "react";
import { FC } from "react";
import "./Styles.css";

const Footer: FC = () => {
    const InstagramIcon = () => (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
        >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
        </svg>
    );

    const TikTokIcon = () => (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
        </svg>
    );

    return (
        <div id="footer">
            <a href="/"><img id="logo" src="/assets/logo.svg" /></a>
            <h3>O evento de tecnologia da ESTG - IPP</h3>
            <ul>
                <li><a href="#oradores">Oradores</a></li>
                <li><a href="#localisation">Localização</a></li>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/contact">Contactar</a></li>
                <li><a href="#registrations">Participar</a></li>
            </ul>
            <ul className="socials">
                <li>
                    <a href="https://www.instagram.com/estg.connect/" className="instagram" target="_blank" rel="noreferrer">
                        <InstagramIcon />
                    </a>
                </li>
                <li>
                    <a href="https://www.tiktok.com/@estg.connect" className="tiktok" target="_blank" rel="noreferrer">
                        <TikTokIcon />
                    </a>
                </li>
            </ul>
            <hr />
            <h3>© 2026 ESTG Connect. Todos os direitos reservados</h3>
        </div>
    );
};

export default Footer;