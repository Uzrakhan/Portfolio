// src/data/portfolioData.js
import IdeaboardImg from '../assets/IdeaBoardThumbnail.png';
import TomatoImg from '../assets/TomatoThumbnail.png';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';


export const PORTFOLIO_DATA = {
    // ----------------------------------------------------
    // 1. HERO SECTION DATA
    // ----------------------------------------------------
    hero: {
        name: "Uzra Khan",
        specialty: "Fullstack Developer",
        summary: "Aspiring Fullstack Developer focused on creating scalable, performant web applications using React, Next.js, and Node.js.",
        email: "uzrakhan539@gmail.com"
    },
    // ----------------------------------------------------
    // 2. NAVIGATION LINKS
    // ----------------------------------------------------
    navLinks: [
        { text: "About", href: "about" },
        { text: "Philosophy", href: "philosophy" },
        { text: "Learning Log", href: "learning-log" },
        { text: "Projects", href: "projects" },
        // We'll add 'Contact' later when the form is built
    ],
    // ----------------------------------------------------
    // 3. ABOUT SECTION DATA
    // ----------------------------------------------------
    about: {
        // Use HTML structure here as this will be rendered directly
        description: `
          Hi, I’m Uzra Khan, a passionate and dedicated self-taught Fullstack Developer. I recently focused my learning on the modern web development stack, including <strong>React/Next.js for the frontend</strong> and <strong>Node.js/Express for the backend</strong>.
          <br/><br/>
          Although I don't have formal, paid work experience, I have channeled all my effort into building <strong>real-world, hands-on projects</strong> that demonstrate my ability to design, develop, and deploy fullstack applications.
        `,
    },
    philosophy: {
                title: "My Development Philosophy ✨",
        pillars: [
            {
                icon: "📄",
                title: "Clean Code",
                description: "I prioritize clean architecture and maintainability, ensuring that code is easy to read, test, and scale for future development.",
            },
            {
                icon: "🌟",
                title: "User Experience",
                description: "Focused on intuitive interfaces that translate complex logic into seamless, delightful user interactions.",
            },
            {
                icon: "📈",
                title: "Scalability",
                description: "I architect resilient systems that can grow efficiently to meet future demands, focusing on API and database performance.",
            },
            {
                icon: "🛠️",
                title: "Full-Stack MERN",
                description: "My go-to stack for a powerful, full-stack JavaScript environment, enabling rapid prototyping and deployment.",
            },
        ],
    },
    learningLog: {
                title: "Current Learning & Growth 🚀",
        currentFocus: [
            {
                title: "Deep Dive: Real-Time Systems Architecture",
                description: "Optimizing WebSockets and Backend Scalability for high-load applications. Goal: Build a real-time collaborative tool.",
                tags: ["WebSockets", "Redis", "Load Balancing"]
            },
            {
                title: "Advanced TypeScript Patterns",
                description: "Mastering utility types, conditional types, and best practices for creating robust, type-safe APIs and application state.",
                tags: ["TypeScript", "Generics", "Type Guards"]
            },
        ],
    },
    projects: [
        {
            title: "IdeaBoard: Real-Time Whiteboard",
            summary: "A highly scalable, collaborative whiteboard platform built with WebSockets, Next.js, and MongoDB. Features real-time drawing, selective sharing, and persistent session storage.",
            tags: ["MERN Stack", "WebSockets", "Next.js", "TypeScript", "Tailwind CSS"],
            path: "/projects/ideaboard", 
            image: IdeaboardImg, // Replace with your actual project image path
            sourceLink: "https://github.com/Uzrakhan/IdeaBoard",
            liveLink: "https://idea-board-virid.vercel.app/",
            videoUrl: "yourvideourl",
            description: "This project addresses the challenge of remote collaboration by providing a real-time, shared digital space for users to brainstorm and draw simultaneously.",
            approach: "Initially, I explored different real-time communication protocols and settled on <strong>WebSockets</strong> for their low-latency, bidirectional capabilities essential for instant drawing updates. For managing user interactions and drawing states, a robust frontend architecture was critical, leading me to use React. The backend was designed with <strong>Node.js</strong> and <strong>Express</strong> to handle concurrent WebSocket connections and manage drawing data persistence efficiently. I prioritized scalability for concurrent users and implemented automated backend tests to ensure reliability of critical API endpoints.",
            techStack: ["TypeScript", "React", "Tailwind CSS", "Socket.io", "Node.js", "Express", "MongoDB"],
            techDecisions: {
                "TypeScript": "Chosen for type-safety, crucial for developing complex, interactive UI components and ensuring data consistency across the real-time application. This reduced common runtime errors compared to plain JavaScript.",
                "React": "Selected for its component-based architecture, which facilitated the creation of reusable UI elements (e.g., drawing tools, canvas) and efficient state management for a dynamic interface, offering better control over rendering performance.",
                "Tailwind CSS": "Utilized for rapid UI development and responsive design. Its utility-first approach allowed for quick styling iterations and ensured the whiteboard adapted seamlessly across different screen sizes.",
                "Socket.io": "Implemented specifically for real-time bidirectional communication. It provided robust features like room management and auto-reconnection, vital for enabling instant drawing updates and managing user permissions in a complex real-time environment.",
                "Node.js & Express": "Chosen for the backend due to their non-blocking I/O model, making them highly efficient for handling numerous concurrent WebSocket connections. This was ideal for a real-time application needing scalable and performant server management.",
                "MongoDB": "Integrated as the database solution for its flexibility and scalability, particularly suited for handling the dynamic and potentially unstructured nature of drawing data and user session information, allowing for quick schema evolution."
            },
            outcome: [
                "Successfully delivered a fully functional MVP (Minimum Viable Product) capable of real-time drawing and synchronization.",
                "Learned advanced concepts in WebSocket communication and state management in real-time applications.",
                "Gained experience in architecting scalable backend services designed to handle concurrent user loads.",
                "Enhanced skills in automated testing for API endpoints, ensuring system reliability and preventing regressions in critical features."
            ]
        },
        {
            title: "Tomato Food App Clone",
            summary: "A functional clone of a popular food ordering application (like Zomato), demonstrating proficiency in state management, complex routing, and secure payment gateway integration.",
            tags: ["React", "Redux Toolkit", "Node.js", "Express", "MongoDB"],
            path: "/projects/tomato-app", 
            image: TomatoImg, // Replace with your actual project image path
            sourceLink: "https://github.com/Uzrakhan/Tomato-food-app",
            liveLink: "https://tomato-food-app-two.vercel.app/",
            videoUrl: "myvideo",
            description: "This application replicates a food ordering platform, simplifying the process of discovering restaurants and authenticating users for a personalized dining experience.",
            approach: "The primary challenge was implementing a secure and efficient authentication system, which was solved by leveraging Firebase Authentication to quickly integrate email/password and Google sign-in. I focused on ensuring robust session management and protecting user-specific routes. For data presentation, dynamic filtering of restaurants was key to enhancing user experience, allowing for quick discovery based on various criteria.",
            techStack: ["TypeScript", "React", "Tailwind CSS", "Socket.io", "Node.js", "Express", "MongoDB"],
            techDecisions: {
                "React": "Chsoen for its efficiency in building dynamic user interfaces, particularly for rendering lists of restaurants and managing complex UI states related to filtering and authentication flows. Its component reusability sped up development.",
                "Firebase": "Selected as the backend-as-a-service (BaaS) for its rapid authentication capabilities and real-time database (Firestore), which simplified user management and data storage, significantly reducing custom backend setup time. ",
                "Tailwind CSS": "Used for its utility-first approach to quickly style responsive components like restaurant cards and navigation, ensuring a consistent and adaptive design across devices without writing much custom CSS."
            },
            outcome: [
                "Successfully implemented a robust Firebase Authentication system, reducing authentication development time by an estimated 30%.",
                "Gained hands-on experience with secure route protection and user session persistence.",
                "Developed dynamic data filtering capabilities, significantly improving the user's ability to navigate and find desired content efficiently. ",
            ]
        },
    ],
        socialLinks: [
        { name: "GitHub", url: "https://github.com/Uzrakhan", icon: FaGithub }, // Use your GitHub URL
        { name: "LinkedIn", url: "https://www.linkedin.com/in/uzra-khan-40b472272/", icon: FaLinkedin }, // Use your LinkedIn URL
        { name: "Twitter", url: "https://twitter.com/your-username", icon: FaTwitter }, // Use your Twitter/X URL
    ],
};