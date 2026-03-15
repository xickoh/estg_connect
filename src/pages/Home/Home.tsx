import React from "react";
import { FC } from "react";
import Hero from "../../components/hero/Hero";

const Home: FC = () => {
    return (
        <div id="home">
            <Hero />;
            <h1>Home</h1>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/contact">Contact</a></li>
                <li><a href="/speaker">Speaker</a></li>
            </ul>
        </div>
    );
};

export default Home;