import React, { useState } from "react";
import { Input } from "antd";

const { Search } = Input;

function SearchFeature(props) {
  const [searchTerm, setsearchTerm] = useState("");
  const searchHandler = (event) => {
    setsearchTerm(event.target.value);
    props.refreshFunction(event.target.value);
  };
  return (
    <div>
      <Search
        placeholder="input search text"
        onChange={searchHandler}
        style={{ width: 200 }}
        value={searchTerm}
      />
    </div>
  );
}

export default SearchFeature;
