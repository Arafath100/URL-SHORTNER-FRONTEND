import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { redirectURL } from '../../Services/APIservices';

function ShortURL() {
    // Extracting the 'urlID' parameter from the URL route
    const { urlID } = useParams();

    // Function to handle URL redirection based on the provided 'urlID'
    async function handleRedirect(urlID) {
        // Calling the 'redirectURL' function from 'APIservices' to perform redirection
        const response = await redirectURL(urlID);
        return response; // Currently not handling the response or subsequent actions
    }

    // Watching changes in 'urlID' to trigger the redirection
    useEffect(() => {
        if (urlID) {
            // Triggering URL redirection when 'urlID' changes
            handleRedirect(urlID);
        }
    }, [urlID]);

    return (
        <>
            {/* 
                The component currently doesn't contain any visible content or UI elements.
                It focuses on URL redirection based on the 'urlID'.
                Consider adding relevant UI elements or handling the redirected response here.
            */}
        </>
    );
}

export default ShortURL;
