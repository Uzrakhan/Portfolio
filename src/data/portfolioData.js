// src/data/portfolioData.js
import IdeaboardImg from '../assets/IdeaBoardThumbnail.png';
import TomatoImg from '../assets/TomatoThumbnail.png';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import CactroResumeImg from '../assets/CactroResume.png';

export const PORTFOLIO_DATA = {
    // ----------------------------------------------------
    // 1. HERO SECTION DATA
    // ----------------------------------------------------
    hero: {
        name: "Uzra Khan",
        specialty: "Frontend Engineer with FullStack Expertise",
        summary: "Dedicated Frontend Engineer with a passion for building highly performant, responsive, and accessible user interfaces. Expert in the React ecosystem and leveraging Fullstack knowledge to drive efficient collaboration and scalable application architecture.",
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
          Hi, I’m Uzra Khan, a passionate and dedicated self-taught Fullstack Developer. I recently focused my learning on the modern web development stack, including <strong>React for the frontend</strong> and <strong>Node.js/Express for the backend</strong>.
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
            id: 1,
            title: "IdeaBoard: Real-Time Whiteboard",
            summary: "A highly scalable, collaborative whiteboard platform built with React.js, TypeScript, WebSockets and MongoDB. Features real-time drawing, selective sharing, and persistent session storage.",
            tags: ["MERN Stack", "WebSockets", "Next.js", "TypeScript", "Tailwind CSS"],
            path: "/projects/ideaboard",
            slug: "ideaboard", 
            image: IdeaboardImg, // Replace with your actual project image path
            sourceLink: "https://github.com/Uzrakhan/IdeaBoard",
            liveLink: "https://idea-board-virid.vercel.app/",
            videoUrl: "https://media.githubusercontent.com/media/Uzrakhan/Portfolio/main/src/assets/IdeaBoardDemo.mp4",
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
            highlights: [
                'Sub-15ms latency',
                '5+ concureent users',
                '99 Lighthouse score'
            ],
            outcome: [
                "Successfully delivered a fully functional MVP (Minimum Viable Product) capable of real-time drawing and synchronization.",
                "Learned advanced concepts in WebSocket communication and state management in real-time applications.",
                "Gained experience in architecting scalable backend services designed to handle concurrent user loads.",
                "Enhanced skills in automated testing for API endpoints, ensuring system reliability and preventing regressions in critical features."
            ]
        },
        {   id: 2,
            title: "Tomato: Full-Stack Food Delivery App",
            summary: "A comprehensive MERN stack food ordering platform featuring a custom-built API, secure authentication, and real-time data management. Built to handle complex relational data between users, restaurants, and orders.",
            tags: ["MERN Stack", "Node.js", "MongoDB", "Express", "React", "Firebase", "Tailwind CSS", "Material UI"],
            path: "/projects/tomato-app", 
            slug: "tomato-app",
            image: TomatoImg, // Replace with your actual project image path
            sourceLink: "https://github.com/Uzrakhan/Tomato-food-app",
            liveLink: "https://tomato-food-app-two.vercel.app/",
            videoUrl: "https://github.com/Uzrakhan/Portfolio/raw/refs/heads/main/src/assets/TomatoDemo.mp4",
            description: "This project evolved from a frontend clone into a full-stack application. It addresses the complexity of managing a digital menu ecosystem, handling secure user data, and providing a scalable backend architecture for food delivery services.",
            approach: "I transitioned the app to a custom backend to gain full control over the data layer. Using <strong>Node.js and Express</strong>, I designed RESTful APIs to manage restaurant data and user profiles. I integrated <strong>MongoDB</strong> for its flexible schema, allowing for complex nested data like menu categories and food items. The backend is deployed on <strong>Render</strong>, while the frontend remains on Vercel, demonstrating my ability to manage cross-origin resource sharing (CORS) and environment-specific configurations.",
            techStack: ["Node.js", "Express", "MongoDB", "React", "Tailwind CSS", "Firebase Auth", "Material UI"],
            techDecisions: {
                "Node.js & Express": "Chosen to build a scalable and performant REST API. Express allowed for clean middleware implementation for request validation and error handling.",
                "MongoDB": "Selected for its document-oriented structure, which perfectly matches the hierarchical nature of food menus (Categories > Dishes > Ingredients).",
                "Firebase Auth": "Retained for secure, production-grade identity management, integrated seamlessly with the custom Node.js backend using the Firebase Admin SDK.",
                "Render": "Used for backend deployment due to its excellent support for Node.js services and automatic continuous deployment from GitHub.",
                "Material UI": "Used for the loading skeleton incase the data from API takes time to load on frontend."
            },
            highlights: [
                "REST APIs",
                "85ms search response",
                "99.9% uptime"
            ],
            outcome: [
                "Architected and deployed a full-stack MERN application with a decoupled frontend and backend.",
                "Developed custom REST API endpoints to handle dynamic data fetching, reducing frontend data processing logic.",
                "Mastered the integration of third-party authentication services with custom backend databases.",
                "Optimized backend performance and successfully managed deployment configurations on Render."
            ]
        },
        {
            id: 3,
            title: "Cactro 3D Resume",
            summary: "An immersive 3D interactive resume experience built using React and Three.js, designed to showcase personal skills and work history in an engaging visual format.",
            tags: ["React", "Three.js", "React Three Fiber", "3D UI", "Animation"],
            path: "/projects/cactro-3d-resume",
            slug: "cactro-3d-resume",
            image: CactroResumeImg, 
            sourceLink: "https://github.com/Uzrakhan/Cactro-3d-resume",
            liveLink: "https://cactro-3d-resume.vercel.app/", 
            videoUrl: "https://raw.githubusercontent.com/Uzrakhan/Portfolio/main/src/assets/CactroResume.mp4",
            description:
                "Cactro 3D Resume reimagines the traditional resume as a 3D interactive Rubik's Cube. Users can explore my professional story in a dynamic, immersive way — from education and skills to project highlights and personal philosophy.",
            approach:
                "I wanted to break away from static resume formats and build something that reflects my technical identity. Using React Three Fiber with Three.js, I constructed a 3D environment representing different sections of a resume as interactive zones. Animations were orchestrated with GSAP and camera transitions to guide the user. The challenge was balancing visuals with performance, so I optimized models and used lazy-loading for heavier assets to ensure smooth interaction across devices.",
            techStack: [
                "React",
                "React Three Fiber",
                "Three.js",
                "GSAP",
                "Tailwind CSS"
            ],
            techDecisions: {
                "React Three Fiber":
                "Chose R3F to write Three.js declaratively inside React, making scene management and component structure far easier than vanilla Three.js.",
                "GSAP":
                "Used for animation timing and smooth camera transitions because of its high performance and fine-grained control compared to CSS or native Web Animations.",
                "Lazy Loading":
                "Implemented lazy loading for 3D assets to improve performance on lower-powered devices and keep interaction responsive.",
                "Tailwind CSS":
                "Used utility classes for quick responsive UI styling outside the 3D canvas components."
            },
            highlights: [
                "Interactive 3D resume interface",
                "Smooth camera and animation transitions",
                "Optimized for performance across devices"
            ],
            outcome: [
                "Created a memorable, interactive representation of my professional story.",
                "Gained deeper architectural and animation expertise with React Three Fiber.",
                "Improved performance optimization strategies for immersive web graphics."
            ]
        }

    ],
        socialLinks: [
        { name: "GitHub", url: "https://github.com/Uzrakhan", icon: FaGithub }, // Use your GitHub URL
        { name: "LinkedIn", url: "https://www.linkedin.com/in/uzra-khan-40b472272/", icon: FaLinkedin }, // Use your LinkedIn URL
        { name: "Twitter", url: "https://twitter.com/your-username", icon: FaTwitter }, // Use your Twitter/X URL
    ],
};