import React, {  useState,  } from "react";
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
    const totalPages = Math.ceil(data.length / booksPerPage);  //sets number of pages
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

      {/* Responsive grid for books */}
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)", // 1 column on small screens
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
        <Button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          bgColor={currentPage === 1 ? "gray" : "primary"}
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
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};


export default AllBooks;