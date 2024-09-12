import {
  Box,
  Image,
  VStack,
  HStack,
  Flex,
  Spacer,
  Text,
  SimpleGrid
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { Book } from "../../types/types";
import BookDetailModal from "../../components/Modal";



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
     
      <Flex mt="4" justifyContent={'center'} >
        <LatestReleases data={books} openModal={openModal} />
 
        {/* <Omnibuses data={books} openModal={openModal} /> */}
      </Flex>
      <Box width="90%">
        <AllBooks data={books} openModal={openModal} />
      </Box>
      {selectedBook && (
        <BookDetailModal book={selectedBook} isOpen={isOpen} onClose={closeModal} />
      )}
    </VStack>
  );
};

export default Librarypage;

interface dataProp {
  data: Book[];
  openModal: (book: Book) => void;
}

const LatestReleases = ({ data , openModal}: dataProp) => {
  const releases = data.slice(1).slice(-5);

  const showReleases = releases.map((book) => {
    return (
      <img
        src={book.image}
        alt={book.title}
        onClick={() => openModal(book)}
     
      />
    );
  });
  return (
    <Box p="5" boxShadow="md" mb="4">
      <Text fontSize="xl">Latest Releases</Text>
      <HStack gap="3">{showReleases}</HStack>
    </Box>
  );
};

const AllBooks = ({ data, openModal }: dataProp) => {
  const showAll = data.map((book) => {
    return (
      <img
        src={book.image}
        alt={book.title}
        onClick={() => openModal(book)}
      
      />
    );
  });

  return (
    <Box p="5" boxShadow="md">
      <Text fontSize="xl">All Books</Text>

      {showAll}
      {/* Resolve pagination, 50 books per  page */}
    </Box>
  );
};

// const Omnibuses = ({ data, openModal }: dataProp) => {
//   // const showReleases = data.map((book) => {
//   //   return (
//   //     <img
//   //       src={book.image}
//   //       alt={book.title}
//   //       onClick={() => openModal(book)}
   
//   //     />
//     );
//   });
//   return (
//     <Box p="5" boxShadow="md" mb="4">
//       <Text fontSize="xl">Omnibuses</Text>
//       <HStack gap="3">{showReleases}</HStack>
//     </Box>
//   );
// };

