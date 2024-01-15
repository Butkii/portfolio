import React from "react";
import Title from "../components/Title";
import AboutMe from "../components/About";

const About = () => {
    return (
        <div className="container mx-auto p-4 py-2">
            <Title title="About" />
            <AboutMe />
        </div>
    );
};
 
export default About;