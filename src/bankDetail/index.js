import React, { useState, useEffect } from "react";
import "./index.css";
const bank_details = JSON.parse(localStorage.getItem("bank_details"));

function BankDetail() {
  return (
    <div className="cardWrapper">
      <div className="bankName">Bank Name: {bank_details.bank_name}</div>
      <div className="bank_detail_item">
        <div className="detail_item_title">IFSC: </div>
        {bank_details.ifsc}
      </div>
      <div className="bank_detail_item">
        <div className="detail_item_title">Branch:</div> {bank_details.branch}
      </div>
      <div className="bank_detail_item">
        <div className="detail_item_title">Addres:</div> {bank_details.address}
      </div>
      <div className="bank_detail_item">
        <div className="detail_item_title">City:</div> {bank_details.city}
      </div>
    </div>
  );
}

export default BankDetail;
