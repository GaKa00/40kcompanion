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
  HStack,
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import axios from "axios";
import { BookDetailModalProps, ReadingList } from "../../types/types";
import useSetCompletedBook from "../../hooks/useSetCompletedBook";
import { AxiosError } from "axios";
import { StarIcon } from "@chakra-ui/icons";

const ReadingListModal: React.FC<BookDetailModalProps> = ({
  book,
  isOpen,
  onClose,
  onUpdate,
}) => {
  const [readingListId, setReadingListId] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [rating, setRating] = useState<number>(0);
  const [newSummary, setNewSummary] = useState<string>("");
  const [newQuote, setNewQuote] = useState<string>("");
  const { setCompletedBook } = useSetCompletedBook();

  // Function to handle finishing reading a book
  const handleRead = async () => {
    if (!readingListId) {
      console.error("No reading list ID available for book:", book.id);
      toast({
        title: "Error",
        description: "Unable to find book in reading list. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      console.log("Attempting to mark book as finished:", {
        bookId: book.id,
        readingListId,
      });
      const updatedList = await setCompletedBook(readingListId);

      if (!updatedList) {
        throw new Error("No response data received from server");
      }

      if (onUpdate) {
        console.log("Updating reading list with completed book:", updatedList);
        onUpdate(updatedList);
        toast({
          title: "Book Completed!",
          description: "The book has been marked as finished.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        onClose();
      } else {
        console.warn("onUpdate callback not provided");
      }
    } catch (error) {
      console.error("Error in handleRead:", error);
      let errorMessage = "Failed to mark book as finished. Please try again.";

      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (axiosError.response?.status === 404) {
          errorMessage = "Book not found in reading list.";
        } else if (axiosError.response?.status === 401) {
          errorMessage = "Please log in again to update your reading list.";
        }
      }

      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Fetches reading list if token and userId are available
  useEffect(() => {
    if (isOpen) {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const userId =
        localStorage.getItem("uid") || sessionStorage.getItem("uid");

      if (!token || !userId) {
        console.error("Missing authentication:", {
          token: !!token,
          userId: !!userId,
        });
        toast({
          title: "Authentication Error",
          description: "Please log in to view your reading list",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      }

      console.log("Fetching reading list for book:", book.id);
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
            console.log("Found book in reading list:", bookEntry);
            setReadingListId(bookEntry.id);
            setRating(bookEntry.rating || 0);
            setNewSummary(bookEntry.summary || "");
            setNewQuote(bookEntry.quotes?.[0] || "");
          } else {
            console.warn("Book not found in reading list:", book.id);
          }
        })
        .catch((error) => {
          console.error("Error fetching reading list:", error);
          toast({
            title: "Error loading book data",
            description: "Please try refreshing the page",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        });
    }
  }, [isOpen, book.id, toast]);

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
            <Image
              src={book.image}
              alt={book.title}
              boxSize="300px"
              objectFit="cover"
            />
          </Flex>

          {/* Divider under image */}
          <Divider mb={4} />

          {/* Rating Section */}
          <Box mb={4}>
            <Text fontSize="lg" fontWeight="bold" mb={2}>
              Your Rating:
            </Text>
            <HStack spacing={1}>
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  color={star <= (rating || 0) ? "yellow.400" : "gray.300"}
                  boxSize={6}
                />
              ))}
              {rating > 0 && (
                <Text ml={2} color="gray.600">
                  ({rating} stars)
                </Text>
              )}
            </HStack>
          </Box>

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
              whiteSpace="pre-wrap"
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
                {newQuote
                  .split("\n")
                  .filter((quote) => quote.trim())
                  .map((quote, index) => (
                    <ListItem key={index} whiteSpace="pre-wrap">
                      {quote}
                    </ListItem>
                  ))}
              </List>
            ) : (
              <Text>No quotes available.</Text>
            )}
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="green"
            ml={3}
            onClick={handleRead}
            isLoading={isLoading}
            loadingText="Updating..."
          >
            Finished Reading
          </Button>
          <Button
            colorScheme="red"
            mr={3}
            onClick={onClose}
            isDisabled={isLoading}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReadingListModal;
