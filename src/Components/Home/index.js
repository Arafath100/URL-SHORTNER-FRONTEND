import React from "react";
import LogButton from "../LogButton";

function Home() {
  return (
    <>
      {/* Container with flexbox for content alignment */}
      <div className="d-flex flex-column justify-content-center align-items-center">
        {/* Title/welcome message */}
        <h5 className="m-5 text-break urlheading">
          Welcome to URL shortener App
        </h5>
        {/* Conditional rendering based on whether a user is logged in */}
        {localStorage.getItem("loggedUsername") && (
          <h5 className="my-2">
            Hi {localStorage.getItem("loggedUsername")} !
          </h5>
        )}
        {!localStorage.getItem("loggedUsername") && (
          <h5 className="my-2">Log in to use the app.</h5>
        )}
        {/* Component to handle login/logout */}
        <LogButton />
      </div>
    </>
  );
}

export default Home;
