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
  useToast,
  Box,
  List,
  ListItem,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import { BookDetailModalProps, ReadingList } from "../../types/types";
import useSetCompletedBook from "../../hooks/useSetCompletedBook";

const ReadingListModal: React.FC<BookDetailModalProps> = ({
  book,
  isOpen,
  onClose,
}) => {
  const [readingListId, setReadingListId] = useState<number>(0); // State to obtain relevant bookid from readinglist
  const toast = useToast();
  const [rating, setRating] = useState<number>(0); // State to set rating in edit mode
  const [newSummary, setNewSummary] = useState<string>(""); // State to set and update summary
  const [newQuote, setNewQuote] = useState<string>(""); // State to set and update quotes
  const { setCompletedBook } = useSetCompletedBook();

  // Function to handle finishing reading a book
  const handleRead = () => {
    if (readingListId) {
      setCompletedBook(readingListId);

      toast({
        title: "Book Completed!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      location.reload();
    }
  };

  // Fetches reading list if token and userId are available
  // If book entries have already been edited, previous changes will be fetched
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
          <Text fontSize="2xl" fontWeight="bold">
            {book.title}
          </Text>
        </ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          <Flex align="center" justify="center" mb={4}>
            <Image src={book.image} alt={book.title} boxSize="300px" />
          </Flex>

          {/* Divider under image */}
          <Divider mb={4} />

          {/* Summary Section */}
          <Box mb={4}>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Summary:
            </Text>
            <Text
              fontSize="md"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              p={3}
              backgroundColor="gray.50"
            >
              {newSummary || "No summary available."}
            </Text>
          </Box>

          {/* Divider between sections */}
          <Divider mb={4} />

          {/* Quotes Section */}
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Quotes:
            </Text>
            {newQuote ? (
              <List spacing={2} styleType="disc" pl={5}>
                {newQuote.split("\n").map((quote, index) => (
                  <ListItem key={index}>{quote}</ListItem>
                ))}
              </List>
            ) : (
              <Text>No quotes available.</Text>
            )}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="green" ml={3} onClick={handleRead}>
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
