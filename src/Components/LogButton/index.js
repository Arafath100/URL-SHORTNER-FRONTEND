import React from "react";
import { useState } from "react";
import { userLogin } from "../../Services/APIservices";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Context/context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { setIsLogged, setCurrentUser } = useGlobalContext();

  const verifyLoginDB = async (payload) => {
    const response = await userLogin(payload);
    return response;
  };

  // Function to handle forgot password redirection
  function handleForgot(e) {
    // Removing user-related local storage data and updating context
    localStorage.removeItem("tokenAuth");
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("loggedUsername");
    localStorage.removeItem("loggedUserID");
    setIsLogged(false);
    setCurrentUser({});
    // Navigating to the forgot password page
    navigate("/forgot-password");
  }

  // Function to handle sign up redirection
  function handleSignup(e) {
    navigate("/signup"); // Navigate to the signup page
  }

  // Function to handle account activation redirection
  function handleActivation(e) {
    navigate("/activation"); // Navigate to the account activation page
  }

  // Function to handle form submission on login
  function handleSubmit(e) {
    e.preventDefault();
    const response = verifyLoginDB({ email: email, password: pwd });

    response
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true);
          setError("");
          const user = { ...res.data.data };
          setCurrentUser({ ...user });
          const token = res.data.token;
          // Storing user-related data in local storage and updating context
          localStorage.setItem("tokenAuth", token);
          localStorage.setItem("loggedUser", user.email);
          localStorage.setItem("loggedUsername", user.fname);
          localStorage.setItem("loggedUserID", user.id);
          setIsLogged(true);
          navigate("/dashboard-url"); // Navigating to the dashboard URL page upon successful login
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
        setSuccess(false);
        console.log(err);
      });
  }

  return (
    <>
      {/* Buttons for sign up, forgot password, and account activation */}
      <div className="d-flex justify-content-end align-items-end mt-3">
        <button className="btn btn-info m-3" onClick={handleSignup}>
          Sign Up
        </button>
      </div>
      <div className="container">
        <div className="d-flex justify-content-center align-items-center flex-lg-row">
          {/* Login form */}
          <div className="border border-dark rounded col-md-8 col-lg-5 bg-light p-5 mt-3">
            <h5 className="text-decoration-underline mb-3">Login</h5>
            <form onSubmit={handleSubmit}>
              {/* Input fields for email and password */}
              <div className="my-3">
                <label>Enter email:</label>
                <br />
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="my-2">
                <label>Enter Password:</label>
                <br />
                <input
                  type="password"
                  onChange={(e) => setPwd(e.target.value)}
                  required
                />
              </div>
              {/* Login button */}
              <button type="submit" className="btn btn-sm btn-primary mt-3">
                Login
              </button>
            </form>
            {/* Display error/success messages */}
            {error && <h6 className="m-3 text-danger text-break">{error}</h6>}
            {success && (
              <h6 className="m-3 text-success text-break">
                Login credentials valid!!
              </h6>
            )}
          </div>
        </div>
        {/* Buttons for forgot password and account activation */}
        <div className="mt-3">
          <button
            className="btn btn-sm btn-secondary mt-3"
            onClick={handleForgot}
          >
            Forgot Password?
          </button>
        </div>
        <div className="mt-3">
          <button
            className="btn btn-sm btn-secondary mt-3"
            onClick={handleActivation}
          >
            Account not activated?
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
