import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Box,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const SearchBar = () => {


  return (
    <Box width="100%" maxWidth="400px" mx="auto">
      <InputGroup>
        <Input
          placeholder="Search..."
          borderRadius="md"
          focusBorderColor="teal.400"
        />
        <InputRightElement>
          <Button  colorScheme="teal" size="sm">
            <SearchIcon />
          </Button>
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default SearchBar;
