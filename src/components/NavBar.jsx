import React from 'react'

const NavBar = ({onLinkClick}) => {
  return (
    <header className='nav-bar'>
      <div className='logo-container'>
        <h4>Uzra Khan</h4>
      </div>
      <div className='links-nav'>
       <a href='/'>Home</a>
       <a href='#' onClick={() => onLinkClick('about')}>About</a>
       <a href='#' onClick={() => onLinkClick('projects')}>Projects</a>
       <a href='#'onClick={() => onLinkClick('contact')}>Contact</a>
      </div>
    </header>
  )
}

export default NavBar