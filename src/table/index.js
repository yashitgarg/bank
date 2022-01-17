import React, { useEffect, useState } from "react";
import { searchFunction } from "../utils/searchFunction";
import "./index.css";
import BankDetail from "../bankDetail";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

export default function Table({ data, searchCriteria, searchTerm }) {
  const [tableData, setTableData] = useState();

  useEffect(() => {
    console.log(tableData);
    setTableData(searchFunction(data, searchCriteria, searchTerm));
  }, [data, searchTerm]);

  //   console.log("data from table: ", data);
  const columns = [
    ["bank_name", "Bank Name"],
    ["ifsc", "IFSC"],
    ["bank_id", "Bank ID"],
    ["branch", "Branch"],
    ["address", "Address"],
  ];

  const handleClick = (row) => {
    localStorage.removeItem("bank_details");
    localStorage.setItem("bank_details", JSON.stringify(row));
    console.log("called!!!", row);
  };

  return (
    <>
      {tableData && (
        <table cellPadding={0} cellSpacing={0} className="tableContainer">
          <thead className="heading">
            <tr>
              {tableData[0] && columns.map((heading) => <th>{heading[1]}</th>)}
            </tr>
          </thead>
          <tbody>
            {tableData.slice(0, 10).map((row) => (
              <tr>
                {columns.map((column) => (
                  <td>{row[column[0]]}</td>
                ))}
                <Link
                  to={{
                    pathname: `/bank-details/${row.ifsc}`,
                    query: { ifsc_code: row.ifsc_code },
                  }}
                  // style={{ textDecoration: "none" }}
                  className="rowItem"
                >
                  <td className="link">
                    <div
                      onClick={() => {
                        handleClick(row);
                      }}
                    >
                      View Details
                    </div>
                  </td>
                </Link>
              </tr>
              //   </Link>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
