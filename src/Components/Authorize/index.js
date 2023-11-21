import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyAuthorization } from "../../Services/APIservices"; // Importing API service for authorization

const Authorize = () => {
    const [searchparam] = useSearchParams(); // Accessing search parameters from the URL
    const [msg, setMsg] = useState(""); // State for displaying messages
    const navigate = useNavigate(); // Hook for navigation

    // Function to verify user authorization using API call
    const verifyUser = useCallback(async (id, token) => {
        try {
            const response = await verifyAuthorization(id, token); // Verifying user authorization via API call
            if (response.status === 200) {
                let resetID = response.data.decode.id;
                navigate(`/reset/${resetID}`); // Redirecting to reset password page upon successful authorization
            }
        } catch (err) {
            let errmsg = err.response.data.message + ": " + (err.response.data.error.name ? err.response.data.error.name : "");
            setMsg(errmsg);
            window.alert("Password Reset link expired");
        }
    }, [navigate]);

    useEffect(() => {
        const id = searchparam.get("id");
        const token = searchparam.get("token");
        if (id && token) {
            verifyUser(id, token); // Verifying user authorization on component mount
        } else {
            window.alert("Password Reset link is invalid");
        }
    }, [searchparam, verifyUser]);

    return (
        <div className="text-white mx-auto my-5">
            <h6>Verifying user authorization. Please wait .. </h6>
            {msg && <h6 className="text-danger">{msg}</h6>}
        </div>
    );
};

export default Authorize;
