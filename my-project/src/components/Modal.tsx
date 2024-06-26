import React from "react";
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
} from "@chakra-ui/react";

interface BookDetailModalProps {
  book: Book;
  isOpen: boolean;
  onClose: () => void;
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
        <Button colorScheme="blue" mr={3} onClick={onClose}>
          Buy on Amazon
        </Button>
        <Button colorScheme="green" mr={3} onClick={onClose}>
          Add to Reading List
        </Button>
        <Button colorScheme="red" mr={3} onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
  )
};

export default BookDetailModal;
