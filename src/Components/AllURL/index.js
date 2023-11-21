import React from 'react';
import { useEffect, useState } from 'react';
import { getAllURL, updateURLCount } from '../../Services/APIservices'; // Importing API services for URL operations
import { useGlobalContext } from "../../Context/context"; // Importing global context

function AllURL() {
  const [urlList, setURLlist] = useState([]); // State to store URL list
  const { isLogged, currentUser } = useGlobalContext(); // Accessing global context

  // Function to fetch all URLs
  const getAll = async (data, config) => {
    try {
      const response = await getAllURL(data, config);
      if (response.status === 200) {
        setURLlist([...response.data.data]); // Update URL list state with fetched data
      }
    } catch (err) {
      window.alert("Network error");
      console.log("error", err);
    }
  };

  // Function to update URL click count
  const updateURLCountDB = async (data, config) => {
    try {
      const response = await updateURLCount(data, config);
      if (response.status === 200) {
        let id = response.data.data.value.urlID;
        let clickcount = response.data.data.value.clicked;
        setURLlist(urlList.map((el) => {
          if (el.urlID === id) {
            return { ...el, clicked: clickcount }; // Update clicked count for the specific URL
          } else {
            return el;
          }
        }));
      }
    } catch (err) {
      window.alert("Network error");
      console.log("error", err);
    }
  };

  // Handling URL click event to update click count
  async function handleCount(e) {
    let tokenAuth = localStorage.getItem("tokenAuth");
    const config = { headers: { "x-auth-token": tokenAuth } };
    const data = { id: e.target.id };
    updateURLCountDB(data, config); // Update click count using updateURLCountDB function
  }

  useEffect(() => {
    let tokenAuth = localStorage.getItem("tokenAuth");
    const config = { headers: { "x-auth-token": tokenAuth } };
    let loggedUser = localStorage.getItem("loggedUser");

    let data = { email: loggedUser };
    if (loggedUser || tokenAuth !== null) {
      getAll(data, config); // Fetch URLs on component mount if user is logged in
    } else {
      window.alert("Log in to continue");
      console.log("Log in to continue");
    }
  }, [isLogged, currentUser]);

  return (
    <>
      <h4 className="text-decoration-underline mb-3">All URLs</h4>
      <div className='d-flex flex-column justify-content-center align-items-center flex-wrap'>
        <h5>Total URLs created by user: {urlList.length}</h5>
        <div className='w-75 overflow-auto'>
          {urlList.length && (
            <table className="table table-success table-striped table-responsive-md mt-3">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Date</th>
                  <th scope="col">Short URL</th>
                  <th scope="col">Clicked</th>
                  <th scope="col">Long URL</th>
                </tr>
              </thead>
              <tbody>
                {urlList.map((el, i) => (
                  <tr key={el.urlID}>
                    <th scope="row">{i + 1}</th>
                    <td>{el.createdOn}</td>
                    <td>
                      <a
                        id={el.urlID}
                        className='text-decoration-none'
                        href={`/${el.urlID}`}
                        onClick={handleCount}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {el.shortURL}
                      </a>
                    </td>
                    <td>{el.clicked}</td>
                    <td title={el.longURL}>{el.longURL.substring(0, 20) + "..."}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default AllURL;
