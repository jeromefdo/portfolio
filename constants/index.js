import { FaLinkedin, FaGithub, FaFacebook, FaInstagram } from "react-icons/fa";

const navLinks = [
    {
        id: "home",
        title: "Home",
    },
    {
        id: "about",
        title: "About",
    },
    {
        id: "projects",
        title: "Projects",
    },
    {
        id: "experience",
        title: "Experience",
    },
    {
        id: "skills",
        title: "Skills",
    },
    {
        id: "contact",
        title: "Contact",
    },
];

const heroData = [
    {
        name: "Jerome Fernando",
        FirstTitle: "SOFTWARE",
        SecondTitle: "ENGINEER",
        subtitle: "Software Engineering (Bsc Hons) | UI/UX Design | Full Stack Development | Technical Business Analyst | Digital Solutions & Strategy",
    }
];

const accordionData = [
        {
            number: "1.",
            title: "UI/UX Design",
            content: "Designing clean, user-centric interfaces for mobile apps and web platforms. Focusing on user research, wireframing, prototyping, and high-fidelity UI design that delivers intuitive and engaging user journeys."
        },
        {
            number: "2.",
            title: "Graphic Design",
            content: "Creating impactful visual assets, marketing collateral, social media graphics, and digital illustrations. Combining typography, color theory, and layout design to communicate brand messages effectively."
        },
        {
            number: "3.",
            title: "Web Design",
            content: "Crafting beautiful, modern websites that are fully responsive and optimized for performance. Transforming design concepts into clean layouts with seamless navigation and premium styling."
        },
        {
            number: "4.",
            title: "Branding",
            content: "Building cohesive brand identities from the ground up, including logo design, color palettes, typography systems, and brand guidelines that ensure consistency across all touchpoints."
        }        
    ];

const aboutData = [
    {
        title: "About Me",
        description: "Hi, I'm Jerome - a passionate software engineer with a flair for design. I specialize in creating seamless user experiences and visually appealing interfaces. With a strong foundation in both front-end and back-end development, I bring ideas to life through clean code and innovative solutions. My goal is to craft digital products that not only function flawlessly but also leave a lasting impression on users.",
        experience: 5,
        projects: 20,
        clients: 20,
        phone: "+94 78 877 5031",
        email: "j.a.d.fernando@gmail.com"
    }
];

const socials = [
    {
        name: "LinkedIn",
        icon: FaLinkedin,
        url: "#",
    },
    {
        name: "GitHub",
        icon: FaGithub,
        url: "#",
    },
    {
        name: "Facebook",
        icon: FaFacebook,
        url: "#",
    },
    {
        name: "Instagram",
        icon: FaInstagram,
        url: "#",
    }
];

export {
    navLinks,
    accordionData,
    aboutData,
    socials,
    heroData
};