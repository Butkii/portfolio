import React from "react";
import Title from "../components/Title";
import ContactForm from "../components/ContactForm";

const Contact = () => {
    return (
        <div className="container mx-auto p-4">
            <Title title="Contact Me" />
            <ContactForm />
        </div>
    );
};
 
export default Contact;