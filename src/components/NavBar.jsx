import React from 'react'

const NavBar = () => {
  return (
    <header className='nav-bar'>
      <div className='logo-container'>
        <img src='https://plus.unsplash.com/premium_photo-1664540415069-bc45ce3e711e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
         width='45px'
         height='45px'
        />
        <h4>Uzra Khan</h4>
      </div>
      <div className='links-nav'>
       <a href='#'>Home</a>
       <a href='#'>About</a>
       <a href='#'>Projects</a>
       <a href='#'>Contact</a>
      </div>
    </header>
  )
}

export default NavBar