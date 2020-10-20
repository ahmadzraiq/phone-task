import React, { useState } from "react";
import PhoneRow from "./phoneRow";
import axios from "axios";
import { IoIosClose } from "react-icons/io";

export default function PhoneMenu({
  inputRef,
  setDefaultCode,
  setDidSearchFocus,
  didSearchFocus,
  NoItem
}) {
  const [countries, setCountries] = useState([]);
  const [result, setResult] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState({});
  const [inputValue, setInputValue] = useState("");
  const getCountries = () => {
    setDidSearchFocus(true);
    if (countries.length == 0) {
      axios
        .get("https://restcountries.eu/rest/v2/all")
        .then((res) => {
          setCountries(res.data);
        })
        .catch((e) => console.log(e));
    }
  };

  const handleOnChange = ({ target: { value } }) => {
    setInputValue(value);
    if (!value.trim()) return setResult([]);
    const counteriesFilter = countries.filter((c) =>
      c.name.toLowerCase().startsWith(value.toLowerCase())
    );
    setResult(counteriesFilter);
  };

  const renderItem = (country, index) => (
    <div
      key={index}
      onClick={() => {
        setSelectedCountry({
          callingCodes: country.callingCodes[0],
          name: country.name,
          flag: country.flag,
        });
        setResult([]);
        setInputValue("");
        setDidSearchFocus(false);
        inputRef.current.focus();
        setDefaultCode(country.callingCodes[0]);
      }}
    >
      <PhoneRow
        callingCodes={country.callingCodes[0]}
        name={country.name}
        img={country.flag}
      />
    </div>
  );

  return (
    <div className="menuContainer" onClick={(e) => e.stopPropagation()}>
      <PhoneRow
        callingCodes={selectedCountry.callingCodes}
        name={selectedCountry.name}
        img={selectedCountry.flag}
        changeValue={setSelectedCountry}
      />
      <div className="searchInputContainer">
        <input
          className="searchInput"
          placeholder="Search"
          onClick={getCountries}
          onChange={handleOnChange}
          value={inputValue}
        />
        {result.length == 0 && didSearchFocus && inputValue && (
          <div onClick={() => setInputValue("")}>
            <IoIosClose
              style={{ cursor: "pointer" }}
              size={20}
              color="#695959"
            />
          </div>
        )}
      </div>
      {result.length == 0 && didSearchFocus && inputValue ? (
        <NoItem />
      ) : (
        didSearchFocus && (
          <div className="countriesList">
            {result.length != 0
              ? result.map(renderItem)
              : countries.map(renderItem)}
          </div>
        )
      )}
    </div>
  );
}
