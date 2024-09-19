import {
  Box,
  Image,
  VStack,
  HStack,
  Flex,

  Text,
 
  Heading,
  Button,
  Grid,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/ui/Navbar";
import { Book } from "../../types/types";
import BookDetailModal from "../../components/Modal/BookModal";

const Librarypage = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/books")
      .then((response) => setBooks(response.data));
  }, []);

  const openModal = (book: Book) => {
    setSelectedBook(book);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setIsOpen(false);
  };

  return (
    <VStack spacing={8} align="center">
      <Navbar />
      <Box
        position={"relative"}
        height={"900px"}
        rounded={"2xl"}
        boxShadow={"2xl"}
        width={"full"}
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

      <Flex mt="4" justifyContent={"center"} >
        <LatestReleases data={books} openModal={openModal} />
      </Flex>
      <Box width="90%">
        <AllBooks data={books} openModal={openModal} />
      </Box>
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

interface dataProp {
  data: Book[];
  openModal: (book: Book) => void;
}

const LatestReleases = ({ data, openModal }: dataProp) => {
  const releases = data.slice(1).slice(-5);

  const showReleases = releases.map((book) => {
    return (
      <img src={book.image} alt={book.title} onClick={() => openModal(book)} />
    );
  });
  return (
    <Box p="5" boxShadow="md" mb="4">
      <Text fontSize="xl">Recently Added</Text>
      <HStack gap="3">{showReleases}</HStack>
    </Box>
  );
};

const AllBooks = ({ data, openModal }: dataProp) => {
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 25;
  const booksPerRow = 5;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = data
    .slice(indexOfFirstBook, indexOfLastBook)
    .sort((a, b) => a.id - b.id);

  // Handle page change
  const handleNextPage = () => {
    if (currentPage < Math.ceil(data.length / booksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const showAll = currentBooks.map((book) => {
    return (
      <Box
        key={book.id}
        p={4}
        boxShadow="white-lg"
        rounded="lg"
        maxW="250px"
        h="365px"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        alignItems="center"
        onClick={() => openModal(book)}
        bg="metallic"
      >
        <Box
          as="img"
          src={book.image}
          alt={book.title}
          objectFit="cover"
          h="325px"
          w="100%"
          borderRadius="lg"
        />
      </Box>
    );
  });

  return (
    <Box p="5" boxShadow="md">
      <Text fontSize={{ base: "lg", md: "xl" }}>All Books</Text>

      {/* Responsive grid for books */}
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)", // 2 columns on small screens
          md: "repeat(3, 1fr)", // 3 columns on medium screens
          lg: `repeat(${booksPerRow}, 1fr)`, // Dynamic columns on larger screens
        }}
        gap={6}
        mt={4}
      >
        {showAll}
      </Grid>

      {/* Pagination controls */}
      <Box mt={4} textAlign="center">
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
          ml={4}
          disabled={currentPage === Math.ceil(data.length / booksPerPage)}
        >
          Next
        </Button>
      </Box>
    </Box>
  );

};



