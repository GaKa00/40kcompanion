import React, { useEffect } from "react";
import { Book } from ".././types/types";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
  Text,
  VStack,
  Flex,
  Link,
} from "@chakra-ui/react";
import axios from "axios";


let token = ''
localStorage.getItem(token);
interface BookDetailModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
}


const addtoList = (id: string) => {
  useEffect(() => {
    axios
      .put(`http://localhost:3000/users/${id}/reading-list`)
      .then(() => {
        alert("Book added to reading list");
      })
      .catch((error) => {
        console.error("Error adding book to reading list:", error);
      });
  }, [token]);
}
const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  isOpen,
  onClose,
}) => {
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
            <Button as="a" colorScheme="blue" href={book.link} mr={3}>
              Buy on Amazon
            </Button>
          </Button>
          <Button colorScheme="green" mr={3} onClick={() => addtoList(token)}>
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
