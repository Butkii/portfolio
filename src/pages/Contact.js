import React from "react";
import Title from "../components/Title";
import ContactMe from "../components/ContactForm";

const Contact = () => {
    return (
        <div className="container mx-auto p-4 flex-column justify-center">
            <Title title="Contact Me" />
            <ContactMe />
        </div>
    );
};
 
export default Contact;