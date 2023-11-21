import React from 'react';
import { useState } from "react";
import { forgotPassword } from '../../Services/APIservices';
import { useNavigate } from "react-router-dom";

const ForgotPwd = () => {
  // State variables to manage email input, navigation, and message display
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [msg, setMsg] = useState(false);
  
  // Function to send a password reset link to the provided email
  const forgotPasswordDB = async (email) => {
    const response = await forgotPassword({ email: email });
    return response;
  }

  // Function to handle form submission for password reset
  function handleSubmit(e) {
    e.preventDefault(); 
    setMsg(true);
    const response = forgotPasswordDB(email)
    response
      .then((res) => {
        if (res.status === 200) {
          console.log(res.data)
          navigate('/sent');
        }  
      })
      .catch((err) => {
        console.log(err);
        window.alert(err.response.data.message);
      });
  }

  // JSX rendering for the Forgot Password form
  return (
    <> 
      <div className="container-fluid my-3 ">
        <div className="d-flex justify-content-center align-items-center flex-lg-row">
          <div className="border-0 border-dark rounded bg-s p-5">
            <h5 className="text-white fs-1 fw-bold p-2">Forgot Password</h5>
            <form onSubmit={handleSubmit}>
              <div className="form-outline m-4">
                <input
                  type="email"
                  placeholder='Enter your Email'
                  className="form-control p-2 rounded-2 m-2 border border-secondary-subtle"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></input>
              </div>
              <button
                type="submit"
                className="btn btn-lg bt-b text-light mt-3"
                style={{ background: "#2c3e50" }}
              >
                Send Reset Link
              </button>
            </form>
            {msg && <p>Processing request.. Please wait..</p>}
          </div>
        </div>
      </div> 
    </>
  )
}

export default ForgotPwd;
