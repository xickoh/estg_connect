import React from "react";
import { FC } from "react";
import "./Styles.css";

const Hero: FC = () => {
    return (
        <div id="hero">
            <img className="background" src="/assets/hero_bg.png"></img>
            <div className="title">
                A ESTG CONNECT VOLTOU.
            </div>
        </div>
    );
};

export default Hero;