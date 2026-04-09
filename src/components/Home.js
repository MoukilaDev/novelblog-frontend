import React ,{useEffect, useState} from 'react';
import {testApi} from '../services/api';

// Home component for display messages from API
function Home(){
    const[message, setMessage]  = useState('');

    // Fetch message from API on component mount, by calling testApi,
    useEffect(()=>{
        testApi().then(data => setMessage(data));
    },[])

    return(
        <div className="message">{message}</div>
    )
}

export default Home;