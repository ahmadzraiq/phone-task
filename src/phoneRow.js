import React from "react";

export default function phoneRow({ img, callingCodes, name }) {
  const defaultImg = "https://restcountries.eu/data/can.svg";
  const defaultName = "Canada";
  const defaultCallingCodes = "1";
  return (
    <div className="phoneRow">
      <svg width="30" height="30">
        <image href={img || defaultImg} width="30" height="30" />
      </svg>
      <div style={{ marginLeft: "8px", fontSize: "10px" }}>
        {name || defaultName} (+{callingCodes || defaultCallingCodes})
      </div>
    </div>
  );
}
