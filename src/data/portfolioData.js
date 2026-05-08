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
            title: "IdeaBoard",
            year: "2026",
            category: "Real-Time Collaboration",

            slug: "ideaboard",

            summary:
            "A blazing collaborative whiteboard where teams think together — sub-15ms sync, concurrent multi-user canvas, and a 99 Lighthouse score proving performance and beauty aren't trade-offs.",

            description:
            "This project addresses the challenge of remote collaboration by providing a real-time, shared digital space for users to brainstorm and draw simultaneously.",

            videoUrl:
            "https://media.githubusercontent.com/media/Uzrakhan/Portfolio/main/src/assets/IdeaBoardDemo.mp4",

            image: IdeaboardImg,

            tech: [
            "TypeScript",
            "React",
            "Socket.io",
            "Node.js",
            "Express",
            "MongoDB",
            "Tailwind CSS"
            ],

            metrics: [
            { label: "Latency", value: "<15ms" },
            { label: "Concurrent", value: "5+ users" },
            { label: "Perf Score", value: "99 ⚡" }
            ],

            highlights: [
            "Sub-15ms latency",
            "Concurrent collaborative drawing",
            "99 Lighthouse performance score"
            ],

            approach:
            "Initially, I explored different real-time communication protocols and settled on WebSockets for their low-latency, bidirectional capabilities essential for instant drawing updates. The backend was designed using Node.js and Express to efficiently handle concurrent socket connections and persistent drawing states.",

            techDecisions: {
            "Socket.io":
                "Implemented for real-time bidirectional communication and room management.",
            "TypeScript":
                "Used for scalable type-safe architecture and predictable frontend logic.",
            "MongoDB":
                "Chosen for flexibility in storing dynamic drawing session data."
            },

            outcome: [
            "Built a fully functional real-time collaborative MVP.",
            "Improved expertise in WebSocket architecture.",
            "Learned scalable backend patterns for concurrency."
            ],

            live:
            "https://idea-board-virid.vercel.app/",

            github:
            "https://github.com/Uzrakhan/IdeaBoard"
        },
        {
            id: 2,
            title: "3D Room Portfolio",
            year: "2026",
            category: "Immersive 3D / WebGL",

            slug: "3d-room",

            summary:
            "A fully interactive 3D room built in the browser — Blender-modelled assets, real-time rendering via React Three Fiber and cinematic camera movement.",

            description:
            "An immersive portfolio experience built with React Three Fiber and Blender, allowing visitors to navigate an interactive 3D environment showcasing projects and technical creativity.",

            videoUrl:
            "YOUR_3D_ROOM_VIDEO_URL",

            tech: [
            "React Three Fiber",
            "Three.js",
            "Blender",
            "GSAP",
            "TypeScript",
            "React"
            ],

            metrics: [
            { label: "Engine", value: "WebGL + R3F" },
            { label: "Assets", value: "Blender" },
            { label: "Render", value: "60fps" }
            ],

            highlights: [
            "Interactive 3D room",
            "Smooth GSAP camera transitions",
            "Optimized GLTF rendering"
            ],

            approach:
            "The goal was to create a memorable portfolio experience beyond traditional websites. Blender was used to create optimized low-poly assets while React Three Fiber handled rendering and scene management.",

            techDecisions: {
            "React Three Fiber":
                "Chosen for declarative Three.js scene management inside React.",
            "Blender":
                "Used for creating optimized custom 3D assets.",
            "GSAP":
                "Implemented for cinematic camera transitions and interaction."
            },

            outcome: [
            "Built a fully immersive browser-based 3D experience.",
            "Improved optimization techniques for real-time rendering.",
            "Created a portfolio differentiator for recruiters."
            ],

            live:
            "https://portfolio-nq72.vercel.app/3d-room",

            github: "#"
        },
        {
            id: 3,
            title: "GhostSpace",
            year: "2026",
            category: "Storage Analytics / Productivity",

            slug: "ghostspace",

            summary:
            "An intelligent storage analytics platform that helps users understand, organize, and clean their digital clutter across Gmail, Google Drive, and future cloud integrations.",

            description:
            "GhostSpace was designed to solve digital storage overload by giving users deep visibility into how their Google storage is consumed. The platform analyzes Gmail attachments, Drive files, duplicates, large unused assets, and storage-heavy content patterns to help users reclaim space efficiently.",

            videoUrl:
            "YOUR_GHOSTSPACE_VIDEO_URL",

            tech: [
            "React",
            "TypeScript",
            "Node.js",
            "Google APIs",
            "OAuth 2.0",
            "Tailwind CSS",
            "Express",
            "MongoDB"
            ],

            metrics: [
            { label: "Platforms", value: "Gmail + Drive" },
            { label: "Analysis", value: "Real-Time" },
            { label: "Goal", value: "Storage Cleanup" }
            ],

            highlights: [
            "Google Drive storage analysis",
            "Gmail attachment insights",
            "Large file & duplicate detection",
            "OAuth-secured Google account integration",
            "Storage visualization dashboard",
            "Future-ready architecture for Google Photos integration"
            ],

            approach:
            "The platform was architected around Google OAuth and Google APIs to securely fetch and analyze user storage data across multiple services. The frontend focused heavily on clarity and visualization, helping users quickly identify large files, redundant assets, and inactive content consuming storage space. Emphasis was placed on privacy-first handling and scalable modular integrations for future services like Google Photos.",

            techDecisions: {
            "Google APIs":
                "Used for secure access to Gmail and Drive metadata and storage analytics.",

            "OAuth 2.0":
                "Implemented to ensure secure authentication and permission-scoped access.",

            "React + TypeScript":
                "Chosen for scalable frontend architecture and maintainable UI logic.",

            "MongoDB":
                "Used to manage user session analytics and cached storage metadata.",

            "Tailwind CSS":
                "Enabled fast development of a clean dashboard-oriented interface."
            },

            outcome: [
                "Built a scalable foundation for cross-platform storage analytics.",
                "Improved understanding of OAuth-based integrations and Google ecosystem APIs.",
                "Created an extensible architecture ready for future integrations like Google Photos.",
                "Designed a productivity-focused UX centered around digital decluttering."
            ],

            live:
            "https://ghost-space.vercel.app/",

            github:
            "https://github.com/Uzrakhan/GhostSpace"
        },
        {
            id: 4,
            title: "Tomato Food App",
            year: "2025",
            category: "Full-Stack Clone",

            slug: "tomato-food-app",

            summary:
            "Production-grade Zomato clone with REST APIs, Firebase authentication and scalable backend architecture.",

            description:
            "A complete food ordering ecosystem featuring secure authentication, restaurant metadata, dynamic menus and API-driven architecture.",

            videoUrl:
            "https://github.com/Uzrakhan/Portfolio/raw/refs/heads/main/src/assets/TomatoDemo.mp4",

            image: TomatoImg,

            tech: [
            "React",
            "Node.js",
            "Express",
            "MongoDB",
            "Firebase",
            "Tailwind CSS"
            ],

            metrics: [
            { label: "Uptime", value: "99.9%" },
            { label: "Search", value: "<85ms" },
            { label: "Auth", value: "Firebase" }
            ],

            highlights: [
            "REST API architecture",
            "Secure Firebase authentication",
            "Fast restaurant search"
            ],

            approach:
            "Built a custom backend with Express and MongoDB to manage dynamic restaurant and order data while integrating Firebase authentication securely.",

            techDecisions: {
            "MongoDB":
                "Perfect for flexible restaurant/menu schemas.",
            "Firebase":
                "Used for secure production-ready authentication.",
            "Express":
                "Provided scalable REST API architecture."
            },

            outcome: [
            "Successfully deployed a full-stack MERN application.",
            "Improved backend architecture and API development skills."
            ],

            live:
            "https://tomato-food-app-two.vercel.app/",

            github:
            "https://github.com/Uzrakhan/Tomato-food-app"
        }
    ]
};