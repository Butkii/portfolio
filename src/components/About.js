import React from 'react';
import AboutMeIcons from './Icons';

function AboutMe() {
    return(
        <div className="flex flex-row justify-center items-center p-10 text-left text-light-primary mr-20 md:mr-10 mb-8 md:mb-0 ml-4">
            <div className="p-10 flex flex-col justify-center align-middle text-center max-w-xs">
                <img
                    src="bhakti.jpeg" // Replace with your image source
                    alt="Circular"
                    className="circular-image"
                />
                <h4 className="font-bold">
                    Bhakti Ghaghda
                </h4>
                <h5 className="pb-12"> 
                    Software Developer
                </h5>
                <AboutMeIcons/>
            </div>
            
            <div>
                <p className="max-w-3xl p-10 pt-0">
                    I am a recent graduate of Murdoch University Dubai with a Bachelor of Science in Computer Science and Business Information Systems. I am passionate about using technology to solve real-world problems and make a positive impact on the world.

                    <br /><br />I have a strong academic background, with a GPA of 3.83/4.0. I am also a recipient of the Vice-Chancellor's Commendation for Academic Excellence and the Academic Merit Scholarship.

                    <br /><br />I have interned at three companies, where I have worked on full-stack development and BI development projects. I am proficient in a variety of programming languages and frameworks, including C/C++, Java, HTML/CSS, JavaScript, Dart, and Flutter. I am also experienced with databases, data analytics, and cloud computing.

                    <br /><br />In addition to my technical skills, I am also a strong communicator and team player. I am always willing to learn new things and take on challenges. I am also passionate about working for childhood cancer awareness, mental health, and gender equality.
                    
                    <br /><br /><button className="bg-light-secondary text-light-background text-lg px-4 py-1 rounded-lg font-semibold">Resume</button>
                </p>
            </div>
        </div>            
        
    );
}

export default AboutMe;