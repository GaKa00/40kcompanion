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
  Input,
  Box,
} from "@chakra-ui/react";
import axios from "axios";
import { BookDetailModalProps, ReadingList } from "../../types/types";
import useSaveText from "../../hooks/useSaveText";

const EditedModal: React.FC<BookDetailModalProps> = ({
  book,
  isOpen,
  onClose,
}) => {
  const { saveText } = useSaveText();
  const [readingListId, setReadingListId] = useState<number | null>(null); // State to obtain relevant book id from reading list
  const [newSummary, setNewSummary] = useState<string>(""); // State to set and update summary
  const [newQuote, setNewQuote] = useState<string>(""); // State to set and update quotes
  const [rating, setRating] = useState<number>(0); // State to set rating in edit mode

  const handleSummaryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewSummary(event.target.value);
  };

  const handleQuoteChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuote(event.target.value);
  };

  // Gets book object from reading list and checks for previous changes in edit mode
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
              (entry: any) => entry.book.id === book.id
            );
            if (bookEntry) {
              setReadingListId(bookEntry.id);
              setRating(bookEntry.rating || 0);
              setNewSummary(bookEntry.summary || "");
              setNewQuote(bookEntry.quote || "");
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
          <Text fontSize="xl" fontWeight="bold">
            {book.title}
          </Text>
        </ModalHeader>

        <ModalCloseButton />
        <ModalBody>
          <Flex align="center" justify="center" mb={4}>
            <Image src={book.image} alt={book.title} boxSize="200px" />
          </Flex>

          <Box mb={4}>
            <Text fontWeight="bold">Summary</Text>
            <Input
              value={newSummary}
              onChange={handleSummaryChange}
              placeholder="Enter summary..."
              mt={2}
            />
          </Box>

          <Box mb={4}>
            <Text fontWeight="bold">Quote</Text>
            <Input
              value={newQuote}
              onChange={handleQuoteChange}
              placeholder="Enter quote..."
              mt={2}
            />
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => saveText(newSummary, readingListId!, "summary")}
          >
            Save Summary
          </Button>
          <Button
            colorScheme="green"
            mr={3}
            onClick={() => saveText(newQuote, readingListId!, "quotes")}
          >
            Save Quote
          </Button>
          <Button colorScheme="green" ml={3}>
            Finished Reading
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

// import React, { useState, useEffect } from "react";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalCloseButton,
//   ModalBody,
//   ModalFooter,
//   Button,
//   Text,
//   Image,
//   Flex,
//   Textarea,
// } from "@chakra-ui/react";
// import axios from "axios";
// import {  BookDetailModalProps, ReadingList } from "../../types/types";

//  import useSaveText from "../../hooks/useSaveText";

// const EditedModal: React.FC<BookDetailModalProps> = ({
//   book,
//   isOpen,
//   onClose,
// }) => {
//   const { saveText } = useSaveText();
//   const [readingListId, setReadingListId] = useState<number | null>(null); // State to obtain relevant book id from reading list
//   const [newSummary, setNewSummary] = useState<string>(""); // State to set and update summary
//   const [newQuote, setNewQuote] = useState<string>(""); // State to set and update quotes
//   const [rating, setRating] = useState<number>(0); // State to set rating in edit mode

//   const handleSummaryChange = (
//     event: React.ChangeEvent<HTMLTextAreaElement>
//   ) => {
//     setNewSummary(event.target.value);
//   };

//   const handleQuoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setNewQuote(event.target.value);
//   };

//   //gets book object from readinglist and checks fro previous changes in edit mode
//   useEffect(() => {
//     if (isOpen) {
//       const token =
//         localStorage.getItem("token") || sessionStorage.getItem("token");
//       const userId =
//         localStorage.getItem("uid") || sessionStorage.getItem("uid");

//       if (token && userId) {
//         axios
//           .get(`http://localhost:3000/api/users/${userId}/reading-list`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           })
//           .then((response) => {
//             const readingList = response.data;
//             const bookEntry = readingList.find(
//               (entry: any) => entry.book.id === book.id
//             );
//             if (bookEntry) {
//               setReadingListId(bookEntry.id);
//               setRating(bookEntry.rating || 0);
//               setNewSummary(bookEntry.summary || "");
//               setNewQuote(bookEntry.quote || "");
//             }
//           })
//           .catch((error) => {
//             console.error("Error fetching reading list:", error);
//           });
//       }
//     }
//   }, [isOpen, book.id]);

//   return (
//     <Modal isOpen={isOpen} onClose={onClose} isCentered>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader textAlign="center">
//           <Text>{book.title}</Text>
//         </ModalHeader>

//         <Flex justify="center">{/* Insert stars component here */}</Flex>

//         <ModalCloseButton />
//         <ModalBody>
//           <Flex align="center" justify="center" mb={4}>
//             <Image src={book.image} alt={book.title} boxSize="200px" />
//           </Flex>

//           <Textarea
//             value={newSummary}
//             onChange={handleSummaryChange}
//             placeholder="Enter summary..."
//             mb={4}
//           />
//           <Textarea
//             value={newQuote}
//             onChange={handleQuoteChange}
//             placeholder="Enter quote..."
//             mb={4}
//           />
//         </ModalBody>

//         <ModalFooter>
//           <Button
//             colorScheme="blue"
//             mr={3}
//             onClick={() => saveText(newSummary, readingListId!, "summary")}
//           >
//             Add Summary
//           </Button>
//           <Button
//             colorScheme="green"
//             mr={3}
//             onClick={() => saveText(newQuote, readingListId!, "quotes")}
//           >
//             Add Quote
//           </Button>
//           <Button colorScheme="green" ml={3}>
//             Finished Reading
//           </Button>
//           <Button colorScheme="red" mr={3} onClick={onClose}>
//             Close
//           </Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   );
// };

//               export default EditedModal
