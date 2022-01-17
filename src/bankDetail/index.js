import React, { useState, useEffect } from "react";

const bank_details = JSON.parse(localStorage.getItem("bank_details"));
console.log("leee", bank_details);

function BankDetail() {
  return (
    <div className="cardWrapper">
      <div className="bankName">{bank_details.bank_name}</div>
      <div className="ifsc_code">{bank_details.ifsc}</div>
      <div className="branch">{bank_details.branch}</div>
      <div className="address">{bank_details.address}</div>
      <div className="city">{bank_details.city}</div>
    </div>
  );
}

export default BankDetail;
