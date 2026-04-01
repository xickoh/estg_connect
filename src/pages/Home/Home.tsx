import React from "react";
import { FC } from "react";
import Hero from "../../components/hero/Hero";
import Countdown from "../../components/countdown/Countdown";

const Home: FC = () => {
    return (
        <div id="home">
            <Hero />;
            <Countdown />
        </div>
    );
};

export default Home;