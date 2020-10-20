import React, { useState, useRef } from "react";
import PhoneMenu from "./PhoneMenu";
export default function App() {
  const [isFocus, setIsFocus] = useState(false);
  const [defaultCode, setDefaultCode] = useState(1);
  const [didSearchFocus, setDidSearchFocus] = useState(false);
  const inputRef = useRef();

  const renderNoItem = () => <span className="noResults">No results</span>;
  return (
    <div
      className="root"
      onClick={() => {
        if (isFocus) setIsFocus(false);
        if (didSearchFocus) setDidSearchFocus(false);
      }}
    >
      <div className="container">
        <div className="phoneTitle">Phone</div>
        <div
          className="inputField"
          onClick={(e) => {
            e.stopPropagation();
            setIsFocus(true);
          }}
        >
          <span className="fontSize16">+{defaultCode}</span>
          <input ref={inputRef} className="inputTel fontSize16" />
        </div>
        <div style={{ display: isFocus ? "block" : "none" }}>
          <PhoneMenu
            inputRef={inputRef}
            setDefaultCode={setDefaultCode}
            setDidSearchFocus={setDidSearchFocus}
            didSearchFocus={didSearchFocus}
            NoItem={renderNoItem}
          />
        </div>
      </div>
    </div>
  );
}
