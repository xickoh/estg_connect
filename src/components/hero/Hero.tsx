import React from "react";
import { FC } from "react";
import "./Styles.css";
import Constellation from "../constellation/Constellation";
import Globe from "../globe/Globe";

const Hero: FC = () => {

    return (
        <div id="hero">
            <Constellation />
            {/* <img className="background" src="/assets/hero_bg.png"></img> */}
            <div className="headers">
                <div className="title">
                    A ESTG CONNECT VOLTOU.
                </div>
                <div className="subtitle">
                    O TEU SEMINÁRIO SOBRE TECH
                </div>
            </div>
            <Globe globeColor="#bbf3ff" />;
        </div>
    );
};

export default Hero;