import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [errors,setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState('');

    const handleChange =  (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
        setErrors({...errors, [e.target.name]: ""});
    };

    const validateForm = () => {
        const newErrors = {};
        if(!formData.name.trim()) newErrors.name = 'Name is required.';
        if(!formData.email || !formData.email.match(/^\S+@\S+\.\S+$/)) newErrors.email = 'Invalid email.';
        if(!formData.message.trim()) newErrors.message = 'Message is required.';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!validateForm()) return;

        setIsSubmitting(true);
        try{
            await fetch('https://formspree.io/f/mrbekwzj', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            });
            setSubmitStatus('success');
            setFormData({name: '', email: '', message: ''})
        } catch(error) {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
        console.log(`Form data: Name: ${formData.name}, Email; ${formData.email}, Message: ${formData.message}`)
    };

    return(
        <div className='container d-flex p-2 justify-content-center align-items-center mt-5'>
            <form className='w-50 p-4 border rounded bg-secondary shadow-sm text-black' onSubmit={handleSubmit}>
                <h2 className='text-center mb-4'>Contact Me</h2>
                <div className='mb-3'>
                    <label htmlFor='name' className='form-label'>Name:</label>
                    <input type='text' 
                     name='name' 
                     onChange={handleChange} 
                     value={formData.name} 
                     className='w-100 form-control '/>
                     {errors.name &&  <span className='error-message'>{errors.name}</span>}
                </div>

                <div className='mb-3'>
                    <label htmlFor='email' className='form-label'>Email:</label>
                    <input 
                     type='email' 
                     name='email'
                     onChange={handleChange} 
                     value={formData.email} 
                     className='w-100'/>
                     {errors.email && <span className='error-message'>{errors.email}</span>}
                </div>

                <div className='mb-3'>
                    <label htmlFor='message' className='form-label'>Message:</label>
                    <textarea 
                     type='text' 
                     name='message' 
                     onChange={handleChange} 
                     value={formData.message} 
                     className='w-100'/>
                     {errors.message && <span className='error-message'>{errors.message}</span>}
                </div>

                {submitStatus === 'success' && (
                    <div className='success-message'>Message sent successfully.</div>
                )}

                {submitStatus === 'error' && (
                    <div className='error-message'>Failed to send message.</div>
                )}
                <div className='d-flex justify-content-center'>
                    <button 
                     type='submit' 
                     className='btn btn-dark btn-outline-light'>
                     {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                </div>
            </form>
        </div>
    )
};

export default Contact;