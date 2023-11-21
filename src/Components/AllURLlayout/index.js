import React from 'react';
import AllURL from '../AllURL'; // Importing component to display all URLs
import { useNavigate } from "react-router-dom";

function AllURLlayout() {
    const navigate = useNavigate();

    // Function to handle navigation to the URL creation page
    function handleCreate(e) {
        navigate('/create-url'); // Navigating to the '/create-url' route
    }

    return (
        <div className="container-fluid">
            <div className="d-flex justify-content-end align-items-end mt-3">
                <button className="btn btn-info m-3" onClick={handleCreate}>Create URL</button>
                {/* Render a button to navigate to the URL creation page */}
            </div>
            <AllURL /> {/* Render the component to display all URLs */}
        </div>
    )
}

export default AllURLlayout;
