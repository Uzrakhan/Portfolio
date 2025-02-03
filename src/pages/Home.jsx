import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {
    return(
        <div className='container mt-5 min-vh-150'>
            <div className='d-flex justify-content-between align-items-center p-4'>
                <div className='row align-items-right'>
                    <img src='https://media.istockphoto.com/id/2192384336/vector/young-muslim-woman-in-hijab-holding-laptop-in-hand.jpg?s=612x612&w=0&k=20&c=5d8ujMBxUnWN5F5TA5k3hnDEl4a9wEI0sFdUjBV_QNk='
                    className='img-fluid img-responsive rounded-square'
                    style={{width: '300px', height: 'auto', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', borderRadius: '45%', float: 'right', borderColor: 'white', borderImage: '10px'}}/>
                </div>

                <div className='col-md-6'>
                    <h1 className='mb-4'>Hello, I'm Uzra Khan</h1>
                    <p>
                        I am a passionate Front-End Developer, with experience in React. I love building projects that bring ideas to life and create value.
                    </p>
                </div>
            </div>
            <Link to='/'></Link>
        </div>
    )
};

export default Home;