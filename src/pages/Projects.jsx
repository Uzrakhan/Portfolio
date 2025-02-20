import React from 'react';
import expenseAppImg from '../assets/download.expense-app.png'
import ecommerceAppImg from '../assets/E-commerce-store.png'

const Projects = () => {
    const projectList = [
        {
            id: 'ecommerce-store',
            title: 'E-commerce store',
            description: 'An e-commerce platform with product listings, a shopping cart, and checkout functionality.',
            image: ecommerceAppImg,
            link: 'https://e-commerce-store-react.vercel.app/'
        },
        {
            id: 'todo-app',
            title: 'Todo App',
            description: 'A todo app which lets you to add yout tasks, delete them and mark them as completed.',
            image: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBwfGVufDB8fDB8fHww",
            link: 'https://react-todo-app-seven-kappa.vercel.app/'
        },
        {
            id: 'expense-tracker-app',
            title: 'Expense Tracker App',
            description: 'An interactive logic based expense tracker app which lets you store your expense and income, also gives you a report of your expenditure.',
            image: expenseAppImg,
            link: 'https://xpense-app-murex.vercel.app/'
        },
        {
            id: 'movie-database-app',
            title: 'Movie Database App',
            description: 'A movie database app which shows movies, lets you to search for movies, get ratings, and apply filters to your searches.',
            image: 'https://plus.unsplash.com/premium_photo-1710324884987-7c67e9986713?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bW92aWUlMjBkYXRhYmFzZSUyMGFwcHxlbnwwfHwwfHx8MA%3D%3D',
            link: 'https://movie-database-gray.vercel.app/'
        }, 
        {
            id: 'teams-manager-app',
            title: 'Teams Manager App',
            description: 'A teams manager app which fetches football data and displays it, also lets you apply filters to the result.',
            image: 'https://plus.unsplash.com/premium_photo-1677146014998-01764d1b0ab1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8dGVhbXMlMjBhcHB8ZW58MHx8MHx8fDA%3D',
            link: 'https://teams-manager-app.vercel.app/'
        }, 
        {
            id: 'two-good-clone',
            title: 'Two Good Clone',
            description: 'An interactive clone of Two Good website.',
            image: 'data:image/png;base64,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',
            link: 'https://uzrakhan.github.io/two-good/'
        },
        {
            id: 'book-finder-app',
            title: 'Book Finder App',
            description: 'A book finder app that fetches book data when you search.',
            image: 'https://plus.unsplash.com/premium_photo-1677187301535-b46cec7b2cc8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Ym9va3MlMjBhcHB8ZW58MHx8MHx8fDA%3D',
            link : 'https://book-finder-app-six-eta.vercel.app/'
        }
    ];

    return(
        <div className='container mx-auto mt-10 min-h-screen'>
            <div className='text-center mb-8 pt-4'>
                <h2 className='text-4xl font-bold'>My Projects</h2>
                <p className='text-gray-600 mt-2'>Here are some of my projects.</p>
            </div>

            <div className='row h-30 mt-2'>
                {projectList.map((project, index) => (
                    <div key={index} className='col-md-6 mb-4'>
                        <div className='card shadow-md rounded-2xl h-100 d-flex flex-column'>
                            <img
                            src={project.image}
                            alt={project.title}
                            className='card-img-top w-100 h-100 object-contain rounded-md'
                            />
                            <div className='card-body'>
                                <h3 className='text-xl font-semibold mb-4'>{project.title}</h3>
                                <p className='text-gray-700 mb-4'>{project.description}</p>
                                <a className=' btn btn-primary' 
                                 href={project.link} target="_blank" rel="noopener noreferrer">
                                    View Project
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Projects;