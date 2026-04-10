import React from "react";
import { FC } from "react";
import Hero from "../../components/hero/Hero";
import Countdown from "../../components/countdown/Countdown";
import Speakers from "../../components/speakers/Speakers";
import Localisation from "../../components/localisation/Localisation";

const Home: FC = () => {
    return (
        <div id="home">
            <Hero />;
            <Countdown />
            <Speakers />
            <Localisation />
        </div>
    );
};

export default Home;