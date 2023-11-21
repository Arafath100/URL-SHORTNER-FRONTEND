import React from "react";
import { useState } from "react";
import { activationMail } from "../../Services/APIservices"; // Importing API service for activation mail
import { useNavigate } from "react-router-dom";

const ActivationMail = () => {
  const [email, setEmail] = useState(""); // State for storing email input
  const navigate = useNavigate(); // Hook for navigation
  const [msg, setMsg] = useState(false); // State for displaying message

  // Function to send activation mail via API call
  const activationMailDB = async (email) => {
    const response = await activationMail({ email: email });
    return response;
  };

  // Handling form submission
  function handleSubmit(e) {
    e.preventDefault();
    setMsg(true); // Set message to indicate processing

    // Sending activation mail using activationMailDB function
    const response = activationMailDB(email);
    response
      .then((res) => {
        if (res.status === 200) {
          navigate("/sent"); // Redirecting to '/sent' route upon successful mail sending
        }
      })
      .catch((err) => {
        window.alert(err.response.data.message); // Displaying error message in case of failure
      });
  }

  return (
    <>
      <div className="container-fluid my-3 ">
        <div className="d-flex justify-content-center align-items-center flex-lg-row">
          <div className=" border border-dark rounded bg-white p-5 ">
            <h5 className=" p-2">Re-send Activation Mail</h5>
            <form onSubmit={handleSubmit}>
              <div className="form-outline m-4">
                <label className="form-label mx-2 p-2 fw-bold">
                  Enter Email address:
                </label>
                <input
                  type="email"
                  className="form-control m-2 border border-secondary-subtle"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></input>
              </div>
              <button type="submit" className="btn btn-sm btn-primary m-3">
                Send Activation Link
              </button>
            </form>
            {msg && <p>Processing request.. Please wait..</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ActivationMail;
