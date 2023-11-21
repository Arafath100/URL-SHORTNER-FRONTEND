import { createContext, useState, useContext } from "react";

// Creating a context for managing global state
const NameContext = createContext(); // Context creation

const NameProvider = ({ children }) => {
  // Initializing state variables for current user and login status
  const [currentUser, setCurrentUser] = useState({
    fname: "",
    lname: "",
    email: "",
    id: "",
  });
  const [isLogged, setIsLogged] = useState(false); // Default logged-in status
  const serverURL = "https://url-shortner-backend-task-guvi.onrender.com"; // Server URL

  // Providing global context values to its children components
  return (
    <NameContext.Provider
      value={{ currentUser, setCurrentUser, isLogged, setIsLogged, serverURL }}
    >
      {children}
    </NameContext.Provider>
  );
};

// Custom hook to access the global context values
const useGlobalContext = () => {
  return useContext(NameContext);
};

export { NameContext, NameProvider, useGlobalContext };
