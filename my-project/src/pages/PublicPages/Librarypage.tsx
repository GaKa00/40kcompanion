import {
  Box,
  Image,
  VStack,
  HStack,
  Flex,
  Text,
  Button,
  Grid,
} from "@chakra-ui/react";
import React, {  useEffect, useState, useContext  } from "react";
import axios from "axios";
import Navbar from "../../components/ui/Navbar";
import { Book, bookProp, } from "../../types/types";  //Type for book
import BookDetailModal from "../../components/Modal/BookModal";  // Modal when clicking on a BookCard
import FilterBox from "../../components/FilterBox";
import TagContext from "../../utils/TagContext";  //context to grab  selected tag when filtering searches
import AllBooks from "../../components/AllBooks";
import SearchBar from "../../components/ui/Searchbar";


// Imports above





const Librarypage = () => {
  const [books, setBooks] = useState<Book[]>([]);   //state for handling book fetch from db
  const [selectedBook, setSelectedBook] = useState<Book | null>(null); //state that handles what book was being clicked on
  const [isOpen, setIsOpen] = useState(false); //state to handle whether modal is open or closed
  const { tag } = useContext(TagContext)!  
  



  //Book fetch using searchbyTags, if no tags are provided, will show all books in library
useEffect(() => {
  console.log(`Tag is ${tag}`)
  axios
    .get(`http://localhost:3000/api/books/searchByTags`, {
      params: { tag: tag },
    })
    .then((response) => setBooks(response.data))
    .catch((error) => console.error(error));
}, [tag]);



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

<SearchBar/>
      <FilterBox/>

      <Flex mt="4" justifyContent={"center"}>
        {/* shows 5 latest books added to library */}
        <LatestReleases data={books} openModal={openModal} />  
      </Flex>
      <Box width="90%">
        <AllBooks data={books} openModal={openModal} />
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
  const releases = data.slice(1).slice(-5);
  
  const showReleases = releases.map((book) => {
    return (
      <img src={book.image} alt={book.title} onClick={() => openModal(book)} />
    );
  });
  return (
    <Box p="5" boxShadow="md" mb="4">
      <Text fontSize="xl" fontWeight="bold" color="whiteAlpha">Recently Added</Text>
     
      <HStack gap="3">{showReleases}</HStack>
    </Box>
  );
};






