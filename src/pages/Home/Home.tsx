import React from "react";
import { FC } from "react";
import Hero from "../../components/hero/Hero";
import Countdown from "../../components/countdown/Countdown";
import Parcerias from "../../components/parcerias/Parcerias";

const Home: FC = () => {
    return (
        <div id="home">
            <Hero />;
            <Countdown />
            <Parcerias />
        </div>
    );
};

export default Home;