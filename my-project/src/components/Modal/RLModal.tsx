import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  Image,
  Flex,
  Textarea,
  Switch,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { BookDetailModalProps, ReadingList } from "../../types/types";






const ReadingListModal: React.FC<BookDetailModalProps> = ({
  book,
  isOpen,
  onClose,
}) => {
  const [readingListId, setReadingListId] = useState<number | null>(null); // State to obtain relevant bookid from readinglist
 
  const [rating, setRating] = useState<number>(0); //state to set rating in edit mode
  const [newSummary, setNewSummary] = useState<string>(""); //state to set and update summary
  const [newQuote, setNewQuote] = useState<string>(""); //state to set and update quotes

  // fetches reading list if token and userid is available
  //if book entries have already been edited, previous changes will be fetched, if not, they will be set to empty
  useEffect(() => {
    if (isOpen) {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const userId =
        localStorage.getItem("uid") || sessionStorage.getItem("uid");

      if (token && userId) {
        axios
          .get(`http://localhost:3000/api/users/${userId}/reading-list`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const readingList = response.data;
            const bookEntry = readingList.find(
              (entry: ReadingList) => entry.book.id === book.id
            );
            if (bookEntry) {
              setReadingListId(bookEntry.id);
              setRating(bookEntry.rating || 0);
              setNewSummary(bookEntry.summary || "");
              setNewQuote(bookEntry.quotes || "");
            }
          })
          .catch((error) => {
            console.error("Error fetching reading list:", error);
          });
      }
    }
  }, [isOpen, book.id]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          <Text>{book.title}</Text>
        </ModalHeader>
      
        <Flex justify="center">
        
        

              {/* //change to own made react stars */}
    
        </Flex>
        <ModalCloseButton />
        <ModalBody>
          <Flex align="center" justify="center" mb={4}>
            <Image src={book.image} alt={book.title} boxSize="200px" />
          </Flex>

         
          
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="green" ml={3}>
            {/* onClick={onRead} */}
            Finished Reading
          </Button>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReadingListModal;