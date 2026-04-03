import React from "react";
import { FC } from "react";
import Hero from "../../components/hero/Hero";
import Countdown from "../../components/countdown/Countdown";
import Registrations from "../../components/registrations/Registrations";

const Home: FC = () => {
    return (
        <div id="home">
            <Hero />;
            <Countdown />
            <Registrations />
        </div>
    );
};

export default Home;