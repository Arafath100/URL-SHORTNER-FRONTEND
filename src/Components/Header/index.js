import { Link } from "react-router-dom";
import "./header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  // Using useNavigate from react-router-dom to handle navigation
  const navigate = useNavigate();

  // Function to handle user logout
  const handleLogout = () => {
    // Removing authentication tokens and user data from local storage
    localStorage.removeItem("tokenAuth");
    localStorage.removeItem("loggedUser");
    
    // Redirecting to the login page after logout
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-n">
      <div className="container">
        {/* Link to the home page */}
        <Link className="navbar-brand" to={"/"}>
          <img
            src="./image/url-logo.jpg"
            alt="logo"
            style={{ width: "10rem" }}
          />
        </Link>

        <ul className="navbar-nav ms-auto mb-lg-0 mx-4 fs-5">
          {/* Link to the Signup page */}
          <li className="nav-item">
            <Link
              style={{ textDecoration: "none" }}
              className="text-white mx-4 fs-3"
              to="/signup"
            >
              Signup
            </Link>
          </li>
          {/* Link to the Dashboard page */}
          <li className="nav-item">
            <Link
              style={{ textDecoration: "none" }}
              className="text-white fs-3"
              to="/dashboard-url"
            >
              Dashboard
            </Link>
          </li>
          {/* Link to the Home page */}
          <li className="nav-item">
            <Link className="text-white mx-4 fs-3" to="/login">
              <i className="fas fa-home"></i>
            </Link>
          </li>
          {/* Logout link with onClick event to handle logout */}
          <li className="nav-item">
            <Link
              to="/login"
              className="fs-3 text-white"
              onClick={handleLogout}
            >
              <i className="fa-solid fa-power-off "></i>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
