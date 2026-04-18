import React, { useEffect, useRef } from "react";
import { FC } from "react";
import "./Styles.css";
import Constellation from "../constellation/Constellation";
import Globe from "../globe/Globe";


const Hero: FC = () => {
    const parallaxRef = useRef<HTMLImageElement>(null);


    useEffect(() => {
        const handleScroll = () => {
            if (parallaxRef.current === null) {
                return;
            }
            console.log("fez isto");
            const scroll = window.scrollY;
            const offset = parallaxRef.current.offsetTop;
            const height = parallaxRef.current.offsetHeight;

            parallaxRef.current.style.transform = `translate(-30%, ${(scroll * (-0.5)) - offset - height / 2}px)`;
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div id="hero">
            <div className="parallax-container">
                <img className="background" src="/assets/images/stardust.png" ref={parallaxRef} />
            </div>
            <Constellation />
            <Globe globeColor="#606381" />
            <div className="headers">
                <div className="title">
                    A ESTG<br />CONNECT<br />VOLTOU.
                </div>
                <div className="subtitle">
                    O TEU SEMINÁRIO SOBRE TECH
                </div>
            </div>
        </div>
    );
};

export default Hero;