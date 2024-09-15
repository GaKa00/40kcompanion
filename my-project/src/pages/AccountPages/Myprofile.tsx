import React, { useEffect, useState } from "react";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  Divider,
  Switch,
} from "@chakra-ui/react";
import axios from "axios";
import { Book, ReadingList, User } from "../../types/types";
import Footer from "../../components/ui/Footer";
import ReadingListModal from "../../components/Modal/RLModal";
import EditedModal from "../../components/Modal/EditModeModal";
import { getUser } from "../../utils/renderFetches";

const MyProfile = () => {
  //States
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false); //state that handles opening ReadingList Modal  when true
  const [selectedBook, setSelectedBook] = useState<Book | null>(null); //state that sets data for what book is being opened
  const [editBool, setEditBool] = useState<boolean>(false);

  const openModal = (book: Book) => {
    setSelectedBook(book);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setIsOpen(false);
  };

  //fetch active user data
  getUser(setUser);

  return (
    <div>
      {user ? (
        <>
          <ProfileCard data={user} />
          <ButtonCard
            userId={user.id}
            openModal={openModal}
            editBool={editBool}
            setEditBool={setEditBool}
          />
        </>
      ) : (
        <Text>Loading...</Text>
      )}

      <Footer />
      {editBool
        ? selectedBook && (
            <EditedModal
              book={selectedBook}
              isOpen={isOpen}
              onClose={closeModal}
            />
          )
        : selectedBook && (
            <ReadingListModal
              book={selectedBook}
              isOpen={isOpen}
              onClose={closeModal}
            />
          )}
    </div>
  );
};

const ProfileCard = ({ data }: { data: User }) => {
  return (
    <Center py={6}>
      <Box
        w={"90%"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Image
          h={"150px"}
          w={"full"}
          src={
            "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          }
          objectFit={"cover"}
        />
        <Flex justify={"center"} mt={-12}>
          <Avatar
            size={"2xl"}
            src="./public/images/Profile_Placeholder.jpg"
            css={{
              border: "2px solid white",
            }}
          />
        </Flex>

        <Box p={6}>
          <Stack spacing={0} align={"center"} mb={5}>
            <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
              {data.username}
            </Heading>
            <Text fontSize={"lg"} color={"gray.500"}>
              Beta Tester
            </Text>
          </Stack>
          <Box borderWidth={2} mb={4}>
            <Divider />
          </Box>
          <Stack spacing={0} align={"center"}>
            <Text fontSize={"xl"} fontWeight={600}>
              30
              {/* Add books in readinglist  with is finished¨
               */}
            </Text>
            <Text fontSize={"md"} color={"gray.500"}>
              Books Read
            </Text>
          </Stack>
        </Box>
      </Box>
    </Center>
  );
};

const ButtonCard = ({
  userId,
  openModal,
  editBool,
  setEditBool,
}: {
  userId: number;
  openModal: (book: Book) => void;
  editBool: boolean;
  setEditBool: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [readingList, setReadingList] = useState<any[]>([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    if (token && userId) {
      axios
        .get(`http://localhost:3000/api/users/${userId}/reading-list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          console.log("Fetched reading list:", response.data);
          setReadingList(response.data);
        })
        .catch((error) => {
          console.error("Error fetching reading list:", error);
        });
    }
  }, [userId]);

  const toggleList = (isFinished: boolean) => {
    setShowFinished(isFinished);
  };

  return (
    <>
      <Box p={4} shadow="md" rounded="lg">
        <Flex wrap="wrap" justifyContent="space-evenly">
          <Button colorScheme="teal" onClick={() => toggleList(true)}>
            Finished Reading
          </Button>
          <Button colorScheme="purple" onClick={() => toggleList(false)}>
            To Be Read
          </Button>
        </Flex>
      </Box>
      <Text size="sm" m={2}>
        Edit Mode
      </Text>
      <Switch
        size="md"
        mx={4}
        isChecked={editBool}
        onChange={() => setEditBool(!editBool)}
      />
      <BookShowcase
        readingList={readingList}
        showFinished={showFinished}
        openModal={openModal}
      />
    </>
  );
};

export default MyProfile;

const BookShowcase = ({
  readingList,
  showFinished,
  openModal,
}: {
  readingList: ReadingList[];
  showFinished: boolean;
  openModal: (book: Book) => void;
}) => {
  const filteredBooks = readingList.filter((list) =>
    showFinished ? list.isFinished : !list.isFinished
  );

  console.log("Filtered books:", filteredBooks);

  return (
    <Box
      shadow="lg"
      rounded="lg"
      minH="800px"
      border="1px solid black"
      m="10px"
    >
      {showFinished ? (
        <Heading p="15px" textAlign="center">
          Finished Books
        </Heading>
      ) : (
        <Heading p="15px" textAlign="center">
          Books to read
        </Heading>
      )}

      <Flex flexWrap="wrap" justifyContent="center" gap="3rem">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((list) => (
            <Box key={list.id} p={4} shadow="md" rounded="lg" maxW="300px">
              {list.book.image && (
                <div>

                <Heading fontSize="lg">{list.book.title}</Heading>
                <Image
                  src={list.book.image}
                  alt={list.book.title}
                  onClick={() => openModal(list.book)}
                  cursor="pointer"
                  maxH="200px"
                  />
                  </div>
              )}
            </Box>
          ))
        ) : (
          <Text>No books found</Text>
        )}
      </Flex>
    </Box>
  );
};
