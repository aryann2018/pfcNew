import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";
import React, { useState } from "react";

function SearchBox({ data }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(data);

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filteredResults = data.filter((item) =>
      item.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredResults);
  };

  return (
    <InputGroup>
      <InputLeftElement pointerEvents="none">
        <RiSearchLine />
      </InputLeftElement>
      <Input
        type="text"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearch}
      />
    </InputGroup>
  );
}

export default SearchBox;