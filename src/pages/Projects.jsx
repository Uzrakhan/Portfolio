import React from 'react';

const Projects = () => {
    const projectList = [
        {
            title: 'E-commerce store',
            description: 'An e-commerce platform with product listings, a shopping cart, and checkout functionality.',
            image: "https://plus.unsplash.com/premium_photo-1677995700941-100976883af7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZSUyMGNvbW1lcmNlJTIwc3RvcmV8ZW58MHx8MHx8fDA%3D",
            link: '#'
        },
        {
            title: 'Todo App',
            description: 'A todo app which lets you to add yout tasks, delete them and mark them as completed.',
            image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBwfGVufDB8fDB8fHww",
            link: 'https://react-todo-app-seven-kappa.vercel.app/'
        },
        {
            title: 'Expense Tracker App',
            description: 'An interactive logic based expense tracker app which lets you store your expense and income, also gives you a report of your expenditure.',
            image: "https://media.istockphoto.com/id/1342226850/photo/woman-checking-her-montly-expenses-while-having-coffee-break.webp?a=1&b=1&s=612x612&w=0&k=20&c=qqd0QYWdea7HV3uoZqpXLB0Iaq6sEALJtT9mtnm4vdw=",
            link: '#'
        }
    ];

    return(
        <div className='container mx-auto mt-10 min-h-screen'>
            <div className='text-center mb-8'>
                <h2 className='text-4xl font-bold'>My Projects</h2>
                <p className='text-gray-600 mt-2'>Here are some of my projects.</p>
            </div>

            <div className='row'>
                {projectList.map((project, index) => (
                    <div key={index} className='col-md-6 mb-4'>
                        <div className='card shadow-md rounded-2xl h-70'>
                            <img
                            src={project.image}
                            alt={project.title}
                            className='card-img-top w-100  object-cover rounded-md project-img'
                            />
                            <div className='card-body'>
                                <h3 className='text-xl font-semibold mb-4'>{project.title}</h3>
                                <p className='text-gray-700 mb-4'>{project.description}</p>
                                <a className=' btn btn-primary' href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Projects;