import React, { useEffect, useState, useCallback } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { activateAccount } from '../../Services/APIservices'; // Importing API service for account activation

function ActivateAccount() {
  const { id } = useParams(); // Getting parameters from the URL
  const [searchparam] = useSearchParams(); // Accessing search parameters from the URL
  const [msg, setMsg] = useState(""); // State for displaying messages
  const navigate = useNavigate(); // Hook for navigation

  // Function to activate user account by calling API service
  const activateUser = useCallback(async (userId, token, payload) => {
    try {
      const response = await activateAccount(userId, token, payload); // Activating account via API call
      if (response.status === 200) {
        setMsg("success - account activated");
        window.alert("Account activated successfully. Login");
        navigate(`/login`); // Redirecting to login page after successful activation
      } else {
        let errmsg = "error activating";
        setMsg(errmsg);
        window.alert("error activating account");
      }
    } catch (err) {
      let errmsg = "Activation link invalid";
      setMsg(errmsg);
      window.alert("Activation link invalid");
    }
  }, [navigate]);

  useEffect(() => {
    const token = searchparam.get("activateToken");
    if (id && token) {
      activateUser(id, token, { isActivated: true }); // Calling activateUser function on component mount
    }
  }, [id, searchparam, activateUser]);

  return (
    <div>
      <h5 className='my-5'>Activate Account</h5>
      <div className="text-blue mx-auto my-5">
        <h6>Verifying user authorization. Please wait .. </h6>
        {msg && <h6 className="my-3 text-danger">{msg}</h6>}
      </div>
    </div>
  );
}

export default ActivateAccount;
