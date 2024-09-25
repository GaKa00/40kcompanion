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
  Link,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { BookDetailModalProps } from "../../types/types";



const BookDetailModal: React.FC<BookDetailModalProps> = ({
  book,
  isOpen,
  onClose,
}) => {
  const [bookIdToAdd, setBookIdToAdd] = useState<number | null>(null);

    const toast = useToast();

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
         toast({
           title: "Book added to reading list",
           description: "Your book has been added to your reading list.",
           status: "success",
           duration: 3000,
           isClosable: true,
         });
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
    <ModalContent bgColor="warDust" maxW={{ base: "95%", md: "600px" }}>
      <Flex
        justify="space-between"
        align="center"
        className="border-b-2 border-black"
        bgColor="warDust"
        px={4}
        py={2}
      >
        <ModalHeader
          className=" min-w-48 "
          color="darkGray"
          fontSize={{ base: "lg", md: "xl" }}
        >
          {book.title}
        </ModalHeader>
        <Text color="darkGray" fontSize={{ base: "sm", md: "md" }} paddingRight={15}>
          Pages: {book.pages}
        </Text>
      </Flex>

      <Text
        align="center"
        className="my-3"
        color="darkGray"
        fontSize={{ base: "sm", md: "md" }}
      >
        Written by: {book.author}
      </Text>
      <ModalBody>
        <Flex
          align="center"
          direction={{ base: "column", md: "row" }}
          textAlign={{ base: "center", md: "left" }}
        >
          <Image
            src={book.image}
            alt={book.title}
            boxSize={{ base: "250px", md: "300px" }}
          />
          <Text
            ml={{ base: 0, md: 4 }}
            mt={{ base: 4, md: 0 }}
            color="darkGray"
            fontSize={{ base: "sm", md: "md" }}
          >
            {book.desc}
          </Text>
        </Flex>
      </ModalBody>
      <ModalFooter>
        <Button
          bgColor="imperialBlue"
          mr={3}
          fontSize={{ base: "sm", md: "md" }}
        >
          <Link href={book.link} isExternal>
            Buy from Amazon
          </Link>{" "}
        </Button>
        <Button
          bgColor="orkGreen"
          mr={3}
          fontSize={{ base: "sm", md: "md" }}
          onClick={handleAddToList}
        >
          Add to Reading List
        </Button>
        <Button
          bgColor="chaosRed"
          mr={3}
          fontSize={{ base: "sm", md: "md" }}
          onClick={onClose}
        >
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

};

export default BookDetailModal;
