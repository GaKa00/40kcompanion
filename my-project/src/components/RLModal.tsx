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
import { BookDetailModalProps, ReadingList } from "../types/types";
import ReactStars from "react-stars";
import { MdSave } from "react-icons/md";



//Parent Modal Component for Readinglist Entries

const ReadingListModal: React.FC<BookDetailModalProps> = ({
  book,
  isOpen,
  onClose,
}) => {
  const [readingListId, setReadingListId] = useState<number | null>(null); // State to obtain relevant bookid from readinglist
  const [editBool, setEditBool] = useState<boolean>(false); // State to toggle edit mode
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
            }
          })
          .catch((error) => {
            console.error("Error fetching reading list:", error);
          });
      }
    }
  }, [isOpen, book.id]);

  // function for handling rating changes
  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
    if (readingListId) {
      updateRating(newRating, readingListId);
    }
  };

  //function for updating ratings
  const updateRating = (newRating: number, readingListId: number) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const userId = localStorage.getItem("uid") || sessionStorage.getItem("uid");

    if (!token || !userId || !readingListId) {
      console.error("Token, user ID, or reading list ID is missing");
      return;
    }

    axios
      .put(
        `http://localhost:3000/api/users/${userId}/reading-list/${readingListId}`,
        { rating: newRating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Rating updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating rating:", error);
      });
  };
  //function for updating summaries
  const updateSummary = (newSummary: string, readingListId: number) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const userId = localStorage.getItem("uid") || sessionStorage.getItem("uid");

    if (!token || !userId || !readingListId) {
      console.error("Token, user ID, or reading list ID is missing");
      return;
    }

    console.log(
      `Sending update with summary: ${newSummary}, readingListId: ${readingListId}, userId: ${userId}`
    );

    axios
      .put(
        `http://localhost:3000/api/users/${userId}/reading-list/${readingListId}`,
        { summary: newSummary },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("Summary updated:", response.data);
      })
      .catch((error) => {
        console.error(
          "Error updating summary:",
          error.response ? error.response.data : error.message
        );
      });
  };
  //function for updating summaries
  // if toked and uid exist, the  updated data is sent to update the book entry in backend
  const updateQuote = (newQuote: string, readingListId: number) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const userId = localStorage.getItem("uid") || sessionStorage.getItem("uid");

    if (!token || !userId || !readingListId) {
      console.error("Token, user ID, or reading list ID is missing");
      return;
    }

    axios
      .put(
        `http://localhost:3000/api/users/${userId}/reading-list/${readingListId}`,
        { quotes: newQuote },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log("quotes updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating quotes:", error);
      });
  };

  const [summaryBool, setSummaryBool] = useState<boolean>(false);
  const [quoteBool, setQuoteBool] = useState<boolean>(false);


  //Handle functions for summaries and quotes
  const handleSummaryBool = () => {
    setSummaryBool((prevSummaryBool) => !prevSummaryBool);
  };

  const handleQuoteBool = () => {
    setQuoteBool((prevQuoteBool) => !prevQuoteBool);
  };

  const handleSavedSummary = () => {
    if (readingListId) {
      updateSummary(newSummary, readingListId);
    }
  };

  const handleSavedQuote = () => {
    if (readingListId) {
      updateQuote(newQuote, readingListId);
    }
  };

  const handleSummaryChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setNewSummary(event.target.value);
  };

  const handleQuoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewQuote(event.target.value);
  };



  return (

  
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">
          <Text>{book.title}</Text>
        </ModalHeader>
        <Text size="sm" m={2}>
          Edit Mode
        </Text>
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

          {/* if edit mode id enabled, will show below */}
          {editBool ? (
            <>
              {summaryBool && (
                <>
                  <MdSave onClick={handleSavedSummary} />
                  <Textarea
                    value={newSummary}
                    onChange={handleSummaryChange}
                    placeholder="Press the save button to save your summary!"
                    mb={4}
                  />
                </>
              )}
              {quoteBool && (
                <>
                  <MdSave onClick={handleSavedQuote} />
                  <Textarea
                    value={newQuote}
                    onChange={handleQuoteChange}
                    placeholder="Press the save button above to save your quote. Note. Write only one at a time!"
                    mb={4}
                  />
                </>
              )}
            </>
          ) : 
          // will show if edit mode is disabled
          (
            <>
              {summaryBool && (
                <Box mb={4} p={4} border="1px solid" borderColor="gray.300">
                  <Text>{newSummary}</Text>
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