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
} from "@chakra-ui/react";
import axios from "axios";
import { BookDetailModalProps } from "../types/types";

const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  isOpen,
  onClose,
}) => {
  const [bookIdToAdd, setBookIdToAdd] = useState<number | null>(null);

  useEffect(() => {
    if (bookIdToAdd !== null) {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const userId =
        localStorage.getItem("uid") || sessionStorage.getItem("uid");

      if (token && userId) {
        axios
          .post(
            `http://localhost:3000/api//users/${userId}/reading-list`,
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

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{book.title}</ModalHeader>
        <Text align="center">Written by: {book.author}</Text>
        <ModalCloseButton />
        <ModalBody>
          <Flex align="center">
            <Image src={book.image} alt={book.title} boxSize="200px" />
            <Text ml={4}>{book.desc}</Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3}>
            <a href={book.link} target="_blank">
              Buy from Amazon
            </a>
          </Button>
          <Button colorScheme="green" mr={3} onClick={handleAddToList}>
            Add to Reading List
          </Button>
          <Button colorScheme="red" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default BookDetailModal;
