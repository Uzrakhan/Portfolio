import React, {useState} from 'react'
import { useForm } from '@formspree/react';


const Contact = () => {
  const [state, handleSubmit, reset] = useForm("mzzewbge");
  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }

  return (
    <div className='contact-div'>
      <div>
        <span>Feel free to Contact me by submitting the form below and I will get back to you as soon as possible</span>
      </div>
      <div className='contact-form'>
        <form onSubmit={handleSubmit}>
          <label>NAME</label>
          <input type='text' placeholder='Enter your name' name='name' required/>
          

          <label>EMAIL</label>
          <input type='email' placeholder='Enter your email' name='email' required/>
         

          <label>MESSAGE</label>
          <textarea type='text' placeholder='Enter your message here' name='message' required/>
         

          <button type='submit' disabled={state.submitting}>SUBMIT</button>
        </form>

        <div className='contact-image'>
          <img src='https://images.unsplash.com/photo-1741853215340-7790d20f8bbb?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI5fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D'
            alt='Contact'
          />
        </div>
      </div>

    </div>
  )
}

export default Contact