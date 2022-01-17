import React, { useState, useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import axios from "axios";
import Table from "./table";
import BankDetail from "./bankDetail";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const selectedData = useSelector((state) => state.list);
  const dispatch = useDispatch();
  const [apiData, setApiData] = useState([]);
  const [city, setCity] = useState("MUMBAI");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCriteria, setSearchCritaria] = useState("ifsc");

  useEffect(() => {
    axios
      .get("https://vast-shore-74260.herokuapp.com/banks?city=" + city)
      .then((response) => {
        setApiData(response.data);
        dispatch({
          payload: response.data,
          type: "ADDRESPONSE",
        });
        localStorage.setItem("list", response.data);
      });
  }, []);

  const searchFunction = (data) => {
    const filtered_data = data.filter(
      (row) =>
        row[searchCriteria].toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
    );
    return filtered_data;
  };

  const selectCity = (e) => {
    let selectedCity = e.target.value;
    setCity(selectedCity);
    setApiData([]);
    axios
      .get(
        "https://vast-shore-74260.herokuapp.com/banks?city=" + e.target.value
      )
      .then((response) => {
        setApiData(response.data);
        dispatch({
          payload: response.data,
          type: "ADDRESPONSE",
        });
      });
  };

  return (
    <div className="App">
      <p>Groww</p>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<div>home page</div>}></Route>
          <Route
            path="/bank"
            element={
              <div>
                <div className="searchHeader">
                  <div className="favouritesButtonContainer">
                    <a href="/favourites" className="favouritesButton">
                      Favourites
                    </a>
                  </div>
                  <div className="select-dropdown">
                    <select
                      // onChange={(e) => setCity(e.target.value)}
                      onChange={(e) => selectCity(e)}
                      placeholder="Select City"
                    >
                      <option value="1" disabled>
                        Select City
                      </option>
                      <option value="MUMBAI">MUMBAI</option>
                      <option value="DELHI">DELHI</option>
                      <option value="VADODARA">VADODARA</option>
                    </select>
                  </div>

                  <div className="select-dropdown">
                    <select
                      // defaultValue="ifsc"
                      onChange={(e) => setSearchCritaria(e.target.value)}
                      placeholder="Search Category"
                      defaultValue="Search Category"
                    >
                      <option value="1" disabled>
                        Search Category
                      </option>
                      <option value="ifsc">IFSC</option>
                      <option value="branch">Branch</option>
                      <option value="branch_name">Branch Name</option>
                    </select>
                  </div>

                  <input
                    type="text"
                    placeholder="Search..."
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="inputBox"
                  ></input>
                </div>

                {/* <Table data={searchFunction(list)} /> */}
                <Table
                  data={apiData}
                  searchCriteria={searchCriteria}
                  searchTerm={searchTerm}
                />
              </div>
            }
          ></Route>
          <Route
            path="/favourites"
            element={
              <Table
                data={JSON.parse(localStorage.getItem("favourites"))}
                searchTerm=""
              />
            }
          ></Route>
          <Route
            path="/bank-details/:ifsc_code"
            element={<BankDetail data={searchFunction(apiData)} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
