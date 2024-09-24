import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e: any) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <Box width="100%" maxWidth="400px" mx="auto">
      <InputGroup>
        <Input
          placeholder="Search..."
          value={query}
          onChange={handleInputChange}
          borderRadius="md"
          focusBorderColor="teal.400"
        />
        <InputRightElement>
          <Button onClick={handleSearch} colorScheme="teal" size="sm">
            <SearchIcon />
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
