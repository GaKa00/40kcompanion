import React, { useState } from "react";
import { bookProp } from "../types/types";
import { Box, Text, Button, Grid } from "@chakra-ui/react";

//component for rendering all books + pagination
const AllBooks = ({ data, openModal }: bookProp) => {
  const [currentPage, setCurrentPage] = useState(1);

  //pagination components and functions 12-35

  const booksPerPage = 25;
  const booksPerRow = 5;

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;

  const currentBooks = data
    .sort((a, b) => Number(a.id) - Number(b.id))
    .slice(indexOfFirstBook, indexOfLastBook);

  // Handle page change
  const handleNextPage = () => {
    const totalPages = Math.ceil(data.length / booksPerPage); //sets number of pages
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      smoothScroll();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      smoothScroll();
    }
  };

  //scroll function
  function smoothScroll(duration = 500) {
    const start = window.scrollY;
    const finish = window.innerHeight / 3;
    const startTime = performance.now();

    const scroll = (currentTime: number) => {
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = progress * (2 - progress);

      // Calculate the new scroll position
      const newPosition = start + (finish - start) * ease;
      window.scrollTo(0, newPosition);

      if (progress < 1) {
        requestAnimationFrame(scroll);
      }
    };

    requestAnimationFrame(scroll);
  }
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
        cursor="pointer"
        transition="all 0.3s"
        _hover={{
          transform: "translateY(-5px)",
          boxShadow: "xl",
          borderColor: "gold",
        }}
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
      <Text
        fontSize={{ base: "lg", md: "xl" }}
        fontWeight="bold"
        color="whiteAlpha"
      >
        All Books
      </Text>

      {data.length === 0 ? (
        <Box
          textAlign="center"
          py={10}
          px={4}
          bg="gray.900"
          borderRadius="lg"
          mt={4}
          border="1px solid"
          borderColor="gray.700"
        >
          <Text fontSize="xl" color="gray.400" mb={2}>
            No books found
          </Text>
          <Text color="gray.500">
            Try adjusting your search or filters to find what you're looking for
          </Text>
        </Box>
      ) : (
        <>
          {/* Responsive grid for books */}
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(3, 1fr)",
              lg: `repeat(${booksPerRow}, 1fr)`,
            }}
            gap={6}
            mt={4}
          >
            {showAll}
          </Grid>

          {/* Pagination controls */}
          <Box mt={4} textAlign="center">
            <Button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              bgColor={currentPage === 1 ? "gray" : "primary"}
              _hover={{
                transform: currentPage !== 1 ? "scale(1.05)" : "none",
                bgColor: currentPage === 1 ? "gray" : "primary.600",
              }}
              transition="all 0.2s"
            >
              Previous
            </Button>
            <Button
              onClick={handleNextPage}
              ml={4}
              disabled={currentPage === Math.ceil(data.length / booksPerPage)}
              bgColor={
                currentPage === Math.ceil(data.length / booksPerPage)
                  ? "gray"
                  : "primary"
              }
              _hover={{
                transform:
                  currentPage !== Math.ceil(data.length / booksPerPage)
                    ? "scale(1.05)"
                    : "none",
                bgColor:
                  currentPage === Math.ceil(data.length / booksPerPage)
                    ? "gray"
                    : "primary.600",
              }}
              transition="all 0.2s"
            >
              Next
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default AllBooks;
