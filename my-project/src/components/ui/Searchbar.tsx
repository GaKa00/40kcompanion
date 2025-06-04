import React, { useState, useEffect, useCallback } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  useToast,
  Box,
  Text,
  VStack,
  useOutsideClick,
  useColorModeValue,
  InputLeftElement,
  Divider,
} from "@chakra-ui/react";
import { SearchIcon, CloseIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Book } from "../../types/types";
import useDebounce from "../../hooks/useDebounce";

interface SearchBarProps {
  onSearch: (books: Book[]) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const toast = useToast();
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const searchRef = React.useRef<HTMLDivElement>(null);

  // Color mode values
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.400");

  useOutsideClick({
    ref: searchRef,
    handler: () => setShowDropdown(false),
  });

  // This effect handles the dropdown results while typing
  useEffect(() => {
    const fetchResults = async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.post("http://localhost:3000/api/search", {
          searchQuery: query.trim(),
        });
        setSearchResults(response.data);
      } catch (error) {
        console.error("Search failed:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedSearchQuery) {
      fetchResults(debouncedSearchQuery);
    } else {
      setSearchResults([]);
    }
  }, [debouncedSearchQuery]);

  // This function handles the actual search that filters the main list
  const performSearch = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        onSearch([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await axios.post("http://localhost:3000/api/search", {
          searchQuery: query.trim(),
        });
        onSearch(response.data);
      } catch (error) {
        toast({
          title: "Search failed",
          description: "Unable to perform search. Please try again.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        onSearch([]);
      } finally {
        setIsLoading(false);
      }
    },
    [toast, onSearch]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowDropdown(true);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch(searchResults);
      setShowDropdown(false);
    }
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchResults([]);
    onSearch([]);
    setShowDropdown(false);
  };

  const handleResultClick = (book: Book) => {
    onSearch(searchResults);
    setShowDropdown(false);
  };

  return (
    <Box position="relative" ref={searchRef} width="100%" maxW="600px">
      <InputGroup size="lg">
        <InputLeftElement pointerEvents="none" h="full">
          <SearchIcon color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder="Search books..."
          value={searchQuery}
          onChange={handleSearch}
          onKeyPress={handleKeyPress}
          pl="3rem"
          pr="4.5rem"
          h="3.5rem"
          fontSize="md"
          bg={bgColor}
          borderColor={borderColor}
          _hover={{ borderColor: "blue.400" }}
          _focus={{
            borderColor: "blue.500",
            boxShadow: "0 0 0 1px var(--chakra-colors-blue-500)",
          }}
          borderRadius="full"
        />
        <InputRightElement h="full" width="4.5rem">
          {searchQuery && (
            <IconButton
              aria-label="Clear search"
              icon={<CloseIcon />}
              size="sm"
              onClick={handleClear}
              mr={1}
              variant="ghost"
              colorScheme="gray"
              _hover={{ bg: hoverBg }}
            />
          )}
          <IconButton
            aria-label="Search"
            icon={<SearchIcon />}
            size="sm"
            onClick={() => {
              onSearch(searchResults);
              setShowDropdown(false);
            }}
            isLoading={isLoading}
            colorScheme="blue"
            variant="ghost"
            _hover={{ bg: hoverBg }}
          />
        </InputRightElement>
      </InputGroup>

      {showDropdown && searchQuery && (
        <Box
          position="absolute"
          top="calc(100% + 0.5rem)"
          left={0}
          right={0}
          bg={bgColor}
          boxShadow="lg"
          borderRadius="xl"
          border="1px solid"
          borderColor={borderColor}
          zIndex={1000}
          maxH="400px"
          overflowY="auto"
          sx={{
            "&::-webkit-scrollbar": {
              width: "4px",
            },
            "&::-webkit-scrollbar-track": {
              width: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: borderColor,
              borderRadius: "24px",
            },
          }}
        >
          {isLoading ? (
            <Box p={4} textAlign="center">
              <Text color={subTextColor}>Searching...</Text>
            </Box>
          ) : searchResults.length > 0 ? (
            <VStack align="stretch" spacing={0}>
              {searchResults.map((book, index) => (
                <React.Fragment key={book.id}>
                  {index > 0 && <Divider />}
                  <Box
                    p={3}
                    _hover={{ bg: hoverBg }}
                    cursor="pointer"
                    onClick={() => handleResultClick(book)}
                    transition="background-color 0.2s"
                  >
                    <Text fontWeight="medium" color={textColor}>
                      {book.title}
                    </Text>
                    <Text fontSize="sm" color={subTextColor}>
                      {book.author}
                    </Text>
                  </Box>
                </React.Fragment>
              ))}
            </VStack>
          ) : (
            <Box p={4} textAlign="center">
              <Text color={subTextColor}>No results found</Text>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};

export default SearchBar;
