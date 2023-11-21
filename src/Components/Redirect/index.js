import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useGlobalContext } from '../../Context/context';

function Redirect() {
  // Getting the 'id' parameter from the URL using React Router's useParams
  const { id } = useParams();
  
  // Accessing the 'serverURL' from global context using useGlobalContext hook
  const { serverURL } = useGlobalContext();

  // useCallback to memoize the 'getData' function
  const getData = useCallback(async (id) => {
    try {
      // Fetching data from the server based on the 'id'
      const response = await axios.get(`${serverURL}/${id}`);
      
      // Redirecting the user to the retrieved long URL
      window.location.href = response.data.longURL;
    } catch (err) {
      // Handling errors such as an invalid URL
      window.alert('Invalid URL');
    }
  }, [serverURL]);

  // Fetch data on component mount using useEffect
  useEffect(() => {
    getData(id); // Call getData function with the 'id' parameter
  }, [getData, id]); // Dependencies for useEffect

  // Displaying a message while redirecting the user
  return <div className='m-5 text-white'>You are being redirected...</div>;
}

export default Redirect;
