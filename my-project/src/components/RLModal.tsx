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
import { BookDetailModalProps } from "../types/types";
import ReactStars from "react-stars";
import { MdSave } from "react-icons/md";

const ReadingListModal: React.FC<BookDetailModalProps> = ({
  book,
  isOpen,
  onClose,
}) => {
  const [bookIdToAdd, setBookIdToAdd] = useState<number | null>(null);
  const [editBool, setEditBool] = useState<boolean>(false);

  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    if (bookIdToAdd !== null) {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const userId =
        localStorage.getItem("uid") || sessionStorage.getItem("uid");

      if (token && userId) {
        axios
          .post(
            `http://localhost:3000/api/users/${userId}/reading-list`,
            { bookId: bookIdToAdd },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          )
          .then(() => {
            alert("Book added to reading list");
          })
          .catch((error) => {
            console.error("Error adding book to reading list:", error);
          })
          .finally(() => {
            setBookIdToAdd(null); // Reset the state after the request is complete
          });
      }
    }
  }, [bookIdToAdd]);

  const handleAddToList = () => {
    setBookIdToAdd(book.id);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
  };

  const [summaryBool, setSummaryBool] = useState<boolean>(false);
  const [quoteBool, setQuoteBool] = useState<boolean>(false);

  const handleSummaryBool = () => {
    setSummaryBool((prevSummaryBool) => !prevSummaryBool);
  };
  const handleQuoteBool = () => {
    setQuoteBool((prevQuoteBool) => !prevQuoteBool);
  };

  const handleSavedQuote = () => {
    console.log("saved quote!");
  };
  const handleSavedSummary = () => {
    console.log("saved summary!");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          <Text>{book.title}</Text>
        </ModalHeader>
        <Text size="sm" m={2}>Edit Mode</Text>
        <Switch
          size="md"
          mx={4}
          isChecked={editBool}
          onChange={() => setEditBool(!editBool)}
        />
        <Flex justify="center">
          <ReactStars
            count={5}
            value={rating}
            onChange={handleRatingChange}
            size={35}
            color2={"#ffd700"}
          />
        </Flex>
        <ModalCloseButton />
        <ModalBody>
          <Flex align="center" justify="center" mb={4}>
            <Image src={book.image} alt={book.title} boxSize="200px" />
          </Flex>
          {editBool ? (
            <>
              {summaryBool && (
                <>
                  <MdSave onClick={handleSavedSummary} />{" "}
                  <Textarea
                    placeholder="Press the save button to save your summary!"
                    mb={4}
                  />{" "}
                </>
              )}
              {quoteBool && (
                <>
                  <MdSave onClick={handleSavedQuote} />
                  <Textarea
                    placeholder="Press the save button above to save your quote. Note. Write only one at a time!"
                    mb={4}
                  />
                </>
              )}
            </>
          ) : (
            <>
              {summaryBool && (
                <Box mb={4} p={4} border="1px solid" borderColor="gray.300">
                  <Text>Summary content goes here</Text>
                </Box>
              )}
              {quoteBool && (
                <Box mb={4} p={4} border="1px solid" borderColor="gray.300">
                  <Text>Quote content goes here</Text>
                </Box>
              )}
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {editBool ? (
            <>
              <Button colorScheme="blue" mr={3} onClick={handleSummaryBool}>
                {summaryBool ? "Hide Summary" : "Add Summary"}
              </Button>
              <Button colorScheme="green" mr={3} onClick={handleQuoteBool}>
                {quoteBool ? "Hide Quote" : "Add Quote"}
              </Button>
            </>
          ) : null}
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ReadingListModal;
