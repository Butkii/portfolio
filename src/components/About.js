import React from 'react';
import AboutMeIcons from './Icons';
import ResumePDF from '../assets/BhaktiGhaghda-CV.pdf';
import { useMode } from '../ModeContext';

function AboutMe() {
    const { mode } = useMode();

    return (
        <div className={`flex lg:flex-row flex-col justify-center items-center text-left ${mode === 'light' ? 'text-light-primary' : 'text-dark-primary'} lg:px-20 lg:py-10 py-5 lg:mr-20 mr-10 lg:mb-8 mb-0 lg:ml-4 ml-2`}>
            <div className={`flex flex-col justify-center align-middle text-center max-w-xs ${mode === 'light' ? 'text-light-primary' : 'text-dark-primary'} lg:p-10 p-5 lg:mr-20 mr-10 lg:mb-8 mb-0 lg:ml-4`}>
                <img
                    src="bhakti.jpeg" 
                    alt="Bhakti Ghaghda"
                    className="circular-image"
                />
                <h4 className="font-bold">
                    Bhakti Ghaghda
                </h4>
                <h5 className="pb-12">
                    Software Developer
                </h5>
                <AboutMeIcons />
            </div>

            <div>
                <p className={`max-w-3xl p-10 pt-0 text-justify ${mode === 'light' ? 'text-light-primary' : 'text-dark-primary'}`}>
                    I am a recent graduate of Murdoch University Dubai with a Bachelor of Science in Computer Science and Business Information Systems. I am passionate about using technology to solve real-world problems and make a positive impact on the world.
                    <br /><br />I have a strong academic background, with a GPA of 3.83/4.0. I am also a recipient of the Vice-Chancellor's Commendation for Academic Excellence and the Academic Merit Scholarship.
                    <br /><br />I have interned at three companies, where I have worked on full-stack development and BI development projects. I am proficient in a variety of programming languages and frameworks, including C/C++, Java, HTML/CSS, JavaScript, Dart, and Flutter. I am also experienced with databases, data analytics, and cloud computing.
                    <br /><br />In addition to my technical skills, I am also a strong communicator and team player. I am always willing to learn new things and take on challenges. I am also passionate about working for childhood cancer awareness, mental health, and gender equality.            
                    <br /><br />
                    <a
                        href={ResumePDF}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-4 py-1 rounded-lg font-semibold ${mode === 'light' ? 'bg-light-secondary text-light-background' : 'bg-dark-secondary text-dark-background'}`}
                    >
                        Resume
                    </a>
                </p>
            </div>
        </div>
    );
}

export default AboutMe;
