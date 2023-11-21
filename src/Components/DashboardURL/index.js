import React, { useEffect, useState } from "react";
import {
  getTodayURL,
  getMonthlyURL,
  updateURLCount,
} from "../../Services/APIservices";
import { useGlobalContext } from "../../Context/context";
import { NavLink } from "react-router-dom";
import AllURL from "../AllURL";

function DashboardURL() {
  // State variables to manage URL lists and authentication status
  const [urlList, setURLlist] = useState([]);
  const [monthlyURLlist, setmonthlyURLlist] = useState([]);
  const { isLogged, currentUser } = useGlobalContext();

  // Function to fetch monthly URLs from the backend
  const getMonthlyUrlDB = async (payload, config) => {
    console.log("get today url fn");
    try {
      const response = await getMonthlyURL(payload, config);

      if (response.status === 200) {
        setmonthlyURLlist([...response.data.data]);
      }
    } catch (err) {
      window.alert("Network error");
      console.log("error", err);
    }
  };

  // Function to fetch today's URLs from the backend
  const getTodayUrlDB = async (data, config) => {
    console.log("get today url fn");
    try {
      const response = await getTodayURL(data, config);

      if (response.status === 200) {
        setURLlist([...response.data.data]);
      }
    } catch (err) {
      window.alert("Network error");
      console.log("error", err);
    }
  };

  // Function to update URL click count
  const updateURLCountDB = async (data, config) => {
    console.log("get updated click");
    try {
      const response = await updateURLCount(data, config);
      if (response.status === 200) {
        let id = response.data.data.value.urlID;
        let clickcount = response.data.data.value.clicked;
        setURLlist(
          urlList.map((el) => {
            if (el.urlID === id) {
              return { ...el, clicked: clickcount };
            } else {
              return el;
            }
          })
        );
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  // Function to handle URL click events
  async function handleCount(e) {
    console.log("url clicked");
    let tokenAuth = localStorage.getItem("tokenAuth");
    const config = { headers: { "x-auth-token": tokenAuth } };
    const data = { id: e.target.id };
    updateURLCountDB(data, config);
  }

  // useEffect hook to fetch data on component mount and check user authentication
  useEffect(() => {
    let tokenAuth = localStorage.getItem("tokenAuth");
    const config = { headers: { "x-auth-token": tokenAuth } };
    let loggedUser = localStorage.getItem("loggedUser");

    if (loggedUser || tokenAuth !== null) {
      const currentDate = new Date();
      const date = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      if (month < 10) month = "0" + month;

      let monthDateYear = String(year) + String(month) + String(date);

      var priorDate = new Date(new Date().setDate(currentDate.getDate() - 30));
      const p_date = priorDate.getDate();
      let p_month = priorDate.getMonth() + 1;
      const p_year = priorDate.getFullYear();
      if (p_month < 10) p_month = "0" + p_month;

      let p_monthdate = String(p_year) + String(p_month) + String(p_date);

      let payload = { email: loggedUser, date: p_monthdate };
      getMonthlyUrlDB(payload, config);
      let data = { email: loggedUser, today: monthDateYear };
      getTodayUrlDB(data, config);
    } else {
      console.log("log in to continue");
      window.alert("log in to continue");
    }
  }, [isLogged, currentUser]);
  return (
    <>
      <br />
      <div className="dash ">
        <h5 className="fs-4 text-decoration-underline mb-3"> URL Dashboard </h5>
        {!localStorage.getItem("loggedUsername") ? (
          <h5 className="my-2">Log in to use the app.</h5>
        ) : (
          <div className="container-fluid">
            <div className="row gx-3">
              <div className="col-md-4 col-sm-12">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <h6> Past month activity : </h6>
                  <h2> {monthlyURLlist.length}</h2>
                  <button className="btn btn-primary my-2">
                    <NavLink className="nav-link" to="/create-url">
                      Create URL
                    </NavLink>
                  </button>
                  <button className="btn btn-info my-2">
                    <NavLink className="nav-link" to="/all-url">
                      View all URLs
                    </NavLink>
                  </button>
                </div>
              </div>
              <div className="col-md-8 col-sm-12">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  <h6>Today : {urlList.length > 0 ? urlList.length : "-"} </h6>
                  <div className="w-75 overflow-auto">
                    {urlList.length ? (
                      <table className="table table-success table-striped table-responsive-md mt-3 ">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Short URL</th>
                            <th scope="col">clicked</th>
                            <th scope="col">LongURL</th>
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
                                  className="text-decoration-none"
                                  href={`/${el.urlID}`}
                                  onClick={handleCount}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  {el.shortURL}
                                </a>{" "}
                              </td>
                              <td>{el.clicked}</td>
                              <td title={el.longURL}>
                                {el.longURL.substring(0, 20) + "..."}{" "}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="row gx-3">
              <AllURL />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default DashboardURL;
