import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchFunction } from "../utils/searchFunction";
import "./index.css";
import BankDetail from "../bankDetail";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ReactPaginate from "react-paginate";

export default function Table({ data, searchCriteria, searchTerm }) {
  console.log("from table", data);
  const dispatch = useDispatch();
  const [tableData, setTableData] = useState();
  const [page, setPage] = useState(1);
  const [rowCount, setRowCount] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  useEffect(() => {
    console.log(tableData);
    setTableData(searchFunction(data, searchCriteria, searchTerm));
    setPageCount(Math.ceil(data.length / rowCount));
    console.log("table loaded");
  }, [data, searchTerm]);

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
    dispatch({
      payload: row.ifsc,
      type: "ADDFAV",
    });
  };

  const handlePageClick = (e) => {
    setPage(e.selected + 1);
  };

  const handleFavClicked = (e, data) => {
    var currentData;
    if (!localStorage.getItem("favourites")) currentData = [];
    else currentData = JSON.parse(localStorage.getItem("favourites"));

    console.log("type check", typeof currentData, typeof data);

    currentData.push(data);
    localStorage.setItem("favourites", JSON.stringify(currentData));

    console.log("dataaa", currentData, data);
  };
  return (
    <>
      {tableData && (
        <table cellPadding={0} cellSpacing={0} className="tableContainer">
          <thead className="heading">
            <tr>
              <th>Favourites</th>
              {tableData[0] && columns.map((heading) => <th>{heading[1]}</th>)}
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {tableData
              .slice((page - 1) * rowCount, rowCount * page)
              .map((row) => (
                <tr>
                  <td>
                    <input
                      type="checkbox"
                      onInput={(e) => handleFavClicked(e, row)}
                    />
                  </td>
                  {columns.map((column) => (
                    <td>{row[column[0]]}</td>
                  ))}

                  <td className="link">
                    <Link
                      to={{
                        pathname: `/bank-details/${row.ifsc}`,
                        query: { ifsc_code: row.ifsc_code },
                      }}
                      className="rowItem"
                    >
                      <div
                        onClick={() => {
                          handleClick(row);
                        }}
                      >
                        View Details
                      </div>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
      <div className="pagination">
        <ReactPaginate
          previousLabel={"<<Prev"}
          nextLabel={"Next>>"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"pagination justify-content-end"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    </>
  );
}
