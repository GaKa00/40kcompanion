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
  Box,
  Textarea,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  VStack,
  HStack,
  IconButton,
  Tooltip,
  Divider,
} from "@chakra-ui/react";
import { StarIcon, DeleteIcon } from "@chakra-ui/icons";
import axios from "axios";
import { BookDetailModalProps, ReadingList } from "../../types/types";
import useSaveSummary from "../../hooks/useSaveSummary";
import useSaveQuotes from "../../hooks/useSaveQuotes";

const EditedModal: React.FC<BookDetailModalProps> = ({
  book,
  isOpen,
  onClose,
}) => {
  const toast = useToast();
  const { saveText, loading: summaryLoading } = useSaveSummary();
  const { saveQuote, loading: quoteLoading } = useSaveQuotes();
  const [readingListId, setReadingListId] = useState<number | null>(null);
  const [newSummary, setNewSummary] = useState<string>("");
  const [newQuote, setNewQuote] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [quotes, setQuotes] = useState<string[]>([]);
  const [errors, setErrors] = useState({
    summary: "",
    quote: "",
  });

  const validateContent = (content: string, type: "summary" | "quote") => {
    if (!content.trim()) {
      return `${type.charAt(0).toUpperCase() + type.slice(1)} cannot be empty`;
    }
    if (type === "summary" && content.length > 1000) {
      return "Summary cannot exceed 1000 characters";
    }
    if (type === "quote" && content.length > 500) {
      return "Quote cannot exceed 500 characters";
    }
    return "";
  };

  const handleSummaryChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event.target.value;
    setNewSummary(value);
    setErrors((prev) => ({
      ...prev,
      summary: validateContent(value, "summary"),
    }));
  };

  const handleQuoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setNewQuote(value);
    setErrors((prev) => ({
      ...prev,
      quote: validateContent(value, "quote"),
    }));
  };

  const handleAddQuote = () => {
    const quoteError = validateContent(newQuote, "quote");
    if (quoteError) {
      setErrors((prev) => ({ ...prev, quote: quoteError }));
      return;
    }

    setQuotes((prev) => [...prev, newQuote.trim()]);
    setNewQuote("");
    setErrors((prev) => ({ ...prev, quote: "" }));
  };

  const handleRemoveQuote = (index: number) => {
    setQuotes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveSummary = async () => {
    const summaryError = validateContent(newSummary, "summary");
    if (summaryError) {
      setErrors((prev) => ({ ...prev, summary: summaryError }));
      return;
    }

    try {
      await saveText(newSummary, readingListId!);
      toast({
        title: "Summary saved",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error saving summary",
        description: "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSaveQuotes = async () => {
    if (quotes.length === 0) {
      toast({
        title: "No quotes to save",
        description: "Add at least one quote before saving",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await saveQuote(quotes.join("\n"), readingListId!);
      toast({
        title: "Quotes saved",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error saving quotes",
        description: "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleSaveRating = async () => {
    if (!readingListId) return;

    try {
      await axios.put(
        `http://localhost:3000/api/users/${localStorage.getItem(
          "uid"
        )}/reading-list/${readingListId}/rating`,
        { rating },
        {
          headers: {
            Authorization: `Bearer ${
              localStorage.getItem("token") || sessionStorage.getItem("token")
            }`,
          },
        }
      );
      toast({
        title: "Rating saved",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error saving rating",
        description: "Please try again",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

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
              setQuotes(bookEntry.quotes || []);
            }
          })
          .catch((error) => {
            toast({
              title: "Error loading book data",
              description: "Please try again",
              status: "error",
              duration: 5000,
              isClosable: true,
            });
          });
      }
    }
  }, [isOpen, book.id, toast]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          <Text fontSize="xl" fontWeight="bold">
            {book.title}
          </Text>
        </ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} align="stretch">
            <Flex align="center" justify="center">
              <Image
                src={book.image}
                alt={book.title}
                boxSize="200px"
                objectFit="cover"
              />
            </Flex>

            <Box>
              <FormControl isInvalid={!!errors.summary}>
                <FormLabel fontWeight="bold">Summary</FormLabel>
                <Textarea
                  value={newSummary}
                  onChange={handleSummaryChange}
                  placeholder="Enter your summary of the book..."
                  size="md"
                  rows={4}
                  resize="vertical"
                />
                <FormErrorMessage>{errors.summary}</FormErrorMessage>
              </FormControl>
            </Box>

            <Divider />

            <Box>
              <FormLabel fontWeight="bold">Rating</FormLabel>
              <HStack spacing={1}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Tooltip key={star} label={`${star} stars`}>
                    <IconButton
                      aria-label={`Rate ${star} stars`}
                      icon={<StarIcon />}
                      colorScheme={
                        star <= (hoveredRating || rating) ? "yellow" : "gray"
                      }
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      variant="ghost"
                    />
                  </Tooltip>
                ))}
              </HStack>
            </Box>

            <Divider />

            <Box>
              <FormControl isInvalid={!!errors.quote}>
                <FormLabel fontWeight="bold">Add Quote</FormLabel>
                <Textarea
                  value={newQuote}
                  onChange={handleQuoteChange}
                  placeholder="Enter a memorable quote from the book..."
                  size="md"
                  rows={3}
                  resize="vertical"
                />
                <FormErrorMessage>{errors.quote}</FormErrorMessage>
                <Button
                  mt={2}
                  colorScheme="blue"
                  size="sm"
                  onClick={handleAddQuote}
                  isDisabled={!!errors.quote}
                >
                  Add Quote
                </Button>
              </FormControl>

              {quotes.length > 0 && (
                <Box mt={4}>
                  <Text fontWeight="bold" mb={2}>
                    Saved Quotes:
                  </Text>
                  <VStack align="stretch" spacing={2}>
                    {quotes.map((quote, index) => (
                      <Flex
                        key={index}
                        justify="space-between"
                        align="center"
                        p={2}
                        bg="gray.50"
                        borderRadius="md"
                      >
                        <Text flex={1}>{quote}</Text>
                        <IconButton
                          aria-label="Remove quote"
                          icon={<DeleteIcon />}
                          size="sm"
                          colorScheme="red"
                          variant="ghost"
                          onClick={() => handleRemoveQuote(index)}
                        />
                      </Flex>
                    ))}
                  </VStack>
                </Box>
              )}
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSaveSummary}
            isLoading={summaryLoading}
            isDisabled={!!errors.summary}
          >
            Save Summary
          </Button>
          <Button
            colorScheme="green"
            mr={3}
            onClick={handleSaveQuotes}
            isLoading={quoteLoading}
            isDisabled={quotes.length === 0}
          >
            Save Quotes
          </Button>
          <Button
            colorScheme="yellow"
            mr={3}
            onClick={handleSaveRating}
            isDisabled={rating === 0}
          >
            Save Rating
          </Button>
          <Button colorScheme="red" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditedModal;
