import React from 'react';
import {Link, NavLink} from 'react-router-dom';


const NavBar = () => {
    return(
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container-fluid'>
                <Link to='/' className='navbar-brand'>Uzra's Portfolio</Link>
                <button
                 className="navbar-toggler"
                 type="button"
                 data-bs-toggle="collapse"
                 data-bs-target="#navbarNav"
                 aria-controls="navbarNav"
                 aria-expanded="false"
                 aria-label="Toggle navigation"
                >
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav ms-auto'>
                        <li className='nav-item'>
                            <NavLink to='/' end className='nav-link'>Home</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to='/contact' end className="nav-link">Contact</NavLink>
                        </li>
                        <li className='nav-item'>
                            <NavLink to='/projects' end className="nav-link">Projects</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
};

export default NavBar;