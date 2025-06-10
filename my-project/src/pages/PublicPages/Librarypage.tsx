import {
  Box,
  Image,
  VStack,
  HStack,
  Flex,
  Text,
  Button,
  Grid,
  Skeleton,
  SkeletonText,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import { Book, bookProp } from "../../types/types"; //Type for book
import BookDetailModal from "../../components/Modal/BookModal"; // Modal when clicking on a BookCard
import FilterBox from "../../components/FilterBox";
import TagContext from "../../utils/TagContext"; //context to grab  selected tag when filtering searches
import AllBooks from "../../components/AllBooks";
import SearchBar from "../../components/ui/Searchbar";
import Navbar from "../../components/ui/Navbar";

// Loading skeleton components
const LoadingBookCard = () => (
  <Box
    p={4}
    boxShadow="white-lg"
    rounded="lg"
    maxW="250px"
    h="365px"
    display="flex"
    flexDirection="column"
    justifyContent="space-between"
    alignItems="center"
    bg="metallic"
  >
    <Skeleton height="325px" width="100%" borderRadius="lg" />
  </Box>
);

const LoadingRecentReleases = () => (
  <Box p="5" boxShadow="md" mb="4">
    <SkeletonText noOfLines={1} width="150px" mb={4} />
    <HStack gap="3">
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} height="200px" width="150px" borderRadius="md" />
      ))}
    </HStack>
  </Box>
);

// Imports above

const Librarypage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [recentBooks, setRecentBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);
  const [isLoadingRecent, setIsLoadingRecent] = useState(true);
  const { tag } = useContext(TagContext)!;

  // Fetch recent books only once on initial load
  useEffect(() => {
    const fetchRecentBooks = async () => {
      setIsLoadingRecent(true);
      try {
        console.log("Fetching recent books from frontend...");
        const response = await axios.get(`http://localhost:3000/api/recent`);
        console.log("Recent books response:", response.data);

        if (Array.isArray(response.data) && response.data.length > 0) {
          setRecentBooks(response.data);
        } else {
          console.warn("No recent books found in response");
          setRecentBooks([]);
        }
      } catch (error) {
        console.error("Error fetching recent books:", error);
        setRecentBooks([]);
      } finally {
        setIsLoadingRecent(false);
      }
    };

    fetchRecentBooks();
  }, []); // Empty dependency array means this only runs once on mount

  // Initial book fetch for main library
  useEffect(() => {
    setIsLoadingBooks(true);
    axios
      .get(`http://localhost:3000/api/`)
      .then((response) => {
        setBooks(response.data);
        setFilteredBooks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      })
      .finally(() => {
        setIsLoadingBooks(false);
      });
  }, []);

  // Tag-based book fetch (only affects main library)
  useEffect(() => {
    if (tag) {
      setIsLoadingBooks(true);
      axios
        .get(`http://localhost:3000/api/searchByTags`, {
          params: { tag: tag },
        })
        .then((response) => {
          setBooks(response.data);
          setFilteredBooks(response.data);
        })
        .catch((error) => {
          console.error("Error fetching books by tag:", error);
        })
        .finally(() => {
          setIsLoadingBooks(false);
        });
    }
  }, [tag]);

  const handleSearch = (searchResults: Book[]) => {
    if (searchResults.length === 0) {
      setFilteredBooks(books); // Show all books when search is cleared
    } else {
      setFilteredBooks(searchResults);
    }
  };

  //Modal Functions

  const openModal = (book: Book) => {
    setSelectedBook(book);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setIsOpen(false);
  };

  return (
    <VStack spacing={8} align="center" mt={"4rem"}>
      <Navbar />

      <Box
        position={"relative"}
        height={"500px"}
        rounded={"2xl"}
        boxShadow={"2xl"}
        width={"70%"}
        overflow={"hidden"}
        bgColor="black"
      >
        <Image
          alt={"Hero Image"}
          fit={"cover"}
          align={"center"}
          w={"100%"}
          h={"100%"}
          src="./public/images/LandingImages/alternativeHero.jpg"
        />
      </Box>

      <SearchBar onSearch={handleSearch} />
      <FilterBox />

      <Flex mt="4" justifyContent={"center"}>
        {isLoadingRecent ? (
          <LoadingRecentReleases />
        ) : (
          <LatestReleases data={recentBooks} openModal={openModal} />
        )}
      </Flex>
      <Box width="90%">
        {isLoadingBooks ? (
          <Box p="5" boxShadow="md">
            <SkeletonText noOfLines={1} width="100px" mb={4} />
            <SimpleGrid
              columns={{ base: 1, sm: 2, md: 3, lg: 5 }}
              spacing={6}
              mt={4}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <LoadingBookCard key={i} />
              ))}
            </SimpleGrid>
          </Box>
        ) : (
          <AllBooks data={filteredBooks} openModal={openModal} />
        )}
      </Box>
      {/* modal render */}
      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          isOpen={isOpen}
          onClose={closeModal}
        />
      )}
    </VStack>
  );
};

export default Librarypage;

//component for latest added books
const LatestReleases = ({ data, openModal }: bookProp) => {
  // Ensure data is an array and has items
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <Box p="5" boxShadow="md" mb="4">
        <Text fontSize="xl" fontWeight="bold" color="whiteAlpha">
          Recently Added
        </Text>
        <Text color="gray.500" mt={2}>
          No recent books available
        </Text>
      </Box>
    );
  }

  return (
    <Box p="5" boxShadow="md" mb="4">
      <Text fontSize="xl" fontWeight="bold" color="whiteAlpha">
        Recently Added
      </Text>
      <HStack gap="3">
        {data.map((book) => (
          <img
            key={book.id}
            src={book.image}
            alt={book.title}
            onClick={() => openModal(book)}
          />
        ))}
      </HStack>
    </Box>
  );
};
