import React from "react";
import { useState } from "react";
import { userLogin } from "../../Services/APIservices";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../Context/context";

const Login = () => {
  // State variables for managing email, password, error message, and success status
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Accessing navigation functionality from react-router-dom
  const navigate = useNavigate();

  // Accessing global context to manage application-level state
  const { setIsLogged, setCurrentUser } = useGlobalContext();

  // Function to make a login API request
  const verifyLoginDB = async (payload) => {
    const response = await userLogin(payload);
    return response;
  };

  // Handler function for "Forgot Password" button click
  function handleForgot(e) {
    // Clearing user-related data from local storage and global context
    localStorage.removeItem("tokenAuth");
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("loggedUsername");
    localStorage.removeItem("loggedUserID");
    setIsLogged(false);
    setCurrentUser({});

    // Navigating to the "forgot-password" route
    navigate("/forgot-password");
  }

  // Handler function for "Account not activated" button click
  function handleActivation(e) {
    // Navigating to the "activation" route
    navigate("/activation");
  }

  // Handler function for form submission
  function handleSubmit(e) {
    e.preventDefault();

    // Calling the login API function with user credentials
    const response = verifyLoginDB({ email: email, password: pwd });

    // Handling API response
    response
      .then((res) => {
        if (res.status === 200) {
          // If login is successful, update local storage and global context
          setSuccess(true);
          setError("");
          const user = { ...res.data.data };
          setCurrentUser({ ...user });
          const token = res.data.token;
          localStorage.setItem("tokenAuth", token);
          localStorage.setItem("loggedUser", user.email);
          localStorage.setItem("loggedUsername", user.fname);
          localStorage.setItem("loggedUserID", user.id);
          setIsLogged(true);

          // Navigate user to the dashboard URL
          navigate("/dashboard-url");
        }
      })
      .catch((err) => {
        // If there's an error during login, set error state and log the error
        setError(err.response.data.message);
        setSuccess(false);
        console.log(err);
      });
  }

  return (
    <>
      <div className="container">
        <div className="d-flex justify-content-center align-items-center flex-lg-row">
          <div className="border border-dark rounded col-md-8 col-lg-5 bg-f p-5">
            {/* Login form */}
            <h5 className="mb-3 fs-1 fw-bold" id="head">
              Login
            </h5>
            <form onSubmit={handleSubmit}>
              {/* Email input field */}
              <div className="my-3 px-1">
                <input
                  type="email"
                  className="p-2 rounded-2"
                  placeholder="Enter your Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                ></input>
              </div>
              {/* Password input field */}
              <div className="my-2">
                <input
                  type="password"
                  className="p-2 rounded-2"
                  placeholder="Enter your Password"
                  onChange={(e) => setPwd(e.target.value)}
                  required
                ></input>
              </div>
              {/* Login button */}
              <button
                type="submit"
                className="btn btn-outline-info text-dark mt-3 fw-bold text-uppercase"
                style={{ background: "#edf3f8" }}
                id="login"
              >
                Login
              </button>
            </form>
            {/* Display error/success messages */}
            {error && <h6 className="m-3 text-danger text-break"> {error} </h6>}
            {success && (
              <h6 className="m-3 text-success text-break">
                {" "}
                Login credentials valid !!{" "}
              </h6>
            )}
          </div>
        </div>
        {/* Buttons for "Forgot Password" and "Account not activated" */}
        <div className="mt-3">
          <button
            id="hover"
            className="btn  fs-5 mx-3 px-4 btn-color text-danger mt-3"
            onClick={handleForgot}
          >
            Forgot Password?
          </button>

          <span className="mt-3">
            <button
              id="hover"
              className="btn  fs-5 mx-3 btn-color text-warning mt-3 "
              onClick={handleActivation}
            >
              Account not activated?
            </button>
          </span>
        </div>
      </div>
    </>
  );
};

export default Login;
