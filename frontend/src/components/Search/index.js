import React, { useState, useRef } from "react";
import { IoIosSearch } from "react-icons/io";

import Container, {
  FormSearch,
  IconSearch,
} from "./styles";

import { Input } from "../common";

export const SearchForm = (props) => {
    const ref = useRef(null);
    const [value, setValue] = useState("");

    const handleChange = e =>{
        setValue(e.target.value);
    }

    return (
      <Container ref={ref} style={props.style}>
        <FormSearch>
          <Input
            type="text"
            placeholder="Search for a creator"
            name="search"
            value={value}
            onChange={handleChange}
            icon={<IoIosSearch />}
            rounded
          />
        </FormSearch>
      </Container>
    )
  };

  export default SearchForm
