import React from "react";
import { FC } from "react";
import "./Styles.css";
import Constellation from "../constellation/Constellation";
import Globe from "../globe/Globe";

const Hero: FC = () => {

    return (
        <div id="hero">
            <Constellation />
            <Globe globeColor="#bbf3ff" />;

            <div className="headers">
                <div className="title">
                    A ESTG CONNECT VOLTOU.
                </div>
                <div className="subtitle">
                    O TEU SEMINÁRIO SOBRE TECH
                </div>
            </div>
        </div>
    );
};

export default Hero;