import React, { useState, useRef } from "react";
import PhoneMenu from "./PhoneMenu";
export default function App() {
  const [isFocus, setIsFocus] = useState(false);
  const [defaultCode, setDefaultCode] = useState(121);
  const inputRef = useRef();
  return (
    <div className="root" onClick={() => setIsFocus(false)}>
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
          <PhoneMenu inputRef={inputRef} setDefaultCode={setDefaultCode} />
        </div>
      </div>
    </div>
  );
}
