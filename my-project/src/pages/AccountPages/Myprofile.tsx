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
  Divider,
  Switch,
  Container,
  Badge,
  useToast,
  IconButton,
  Tooltip,
  UseToastOptions,
} from "@chakra-ui/react";
import { EditIcon, StarIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Book, ReadingList, User } from "../../types/types";
import Footer from "../../components/ui/Footer";
import ReadingListModal from "../../components/Modal/RLModal";
import EditedModal from "../../components/Modal/EditModeModal";
import { getUser } from "../../utils/renderFetches";
import Navbar from "../../components/ui/Navbar";

const MyProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [editBool, setEditBool] = useState<boolean>(false);
  const [readingList, setReadingList] = useState<ReadingList[]>([]);
  const toast = useToast();

  const openModal = (book: Book) => {
    setSelectedBook(book);
    setIsOpen(true);
  };

  const closeModal = () => {
    setSelectedBook(null);
    setIsOpen(false);
  };

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      const userId =
        localStorage.getItem("uid") || sessionStorage.getItem("uid");

      if (!token || !userId) {
        toast({
          title: "Authentication Error",
          description: "Please log in to view your profile",
          status: "error",
          duration: 3000,
          isClosable: true,
        } as UseToastOptions);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:3000/api/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        toast({
          title: "Error",
          description:
            "Failed to fetch user data. Please try logging in again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        } as UseToastOptions);
      }
    };
    fetchUserData();
  }, [toast]);

  // Fetch reading list when user is available
  useEffect(() => {
    if (user?.id) {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (token) {
        axios
          .get(`http://localhost:3000/api/users/${user.id}/reading-list`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setReadingList(response.data);
          })
          .catch((error) => {
            console.error("Error fetching reading list:", error);
            toast({
              title: "Error",
              description: "Failed to fetch reading list",
              status: "error",
              duration: 3000,
              isClosable: true,
            });
          });
      }
    }
  }, [user?.id, toast]);

  return (
    <Box minH="100vh" bg="background">
      <Navbar />
      <Container maxW="container.xl" py={8}>
        {user ? (
          <>
            <ProfileCard data={user} readingList={readingList} />
            <ButtonCard
              userId={user.id}
              openModal={openModal}
              editBool={editBool}
              setEditBool={setEditBool}
              readingList={readingList}
              setReadingList={setReadingList}
            />
          </>
        ) : (
          <Center h="50vh">
            <Text fontSize="xl" color="white">
              Loading...
            </Text>
          </Center>
        )}
      </Container>
      <Footer />
      {editBool
        ? selectedBook && (
            <EditedModal
              book={selectedBook}
              isOpen={isOpen}
              onClose={closeModal}
              onUpdate={(updatedData: Book | ReadingList) => {
                if ("book" in updatedData) {
                  // It's a ReadingList
                  setReadingList((prevList) =>
                    prevList.map((item) =>
                      item.id === updatedData.id ? updatedData : item
                    )
                  );
                } else {
                  // It's a Book
                  setReadingList((prevList) =>
                    prevList.map((item) =>
                      item.book.id === updatedData.id
                        ? { ...item, book: updatedData }
                        : item
                    )
                  );
                }
              }}
            />
          )
        : selectedBook && (
            <ReadingListModal
              book={selectedBook}
              isOpen={isOpen}
              onClose={closeModal}
              onUpdate={(updatedData: Book | ReadingList) => {
                if ("book" in updatedData) {
                  // It's a ReadingList
                  setReadingList((prevList) =>
                    prevList.map((item) =>
                      item.id === updatedData.id ? updatedData : item
                    )
                  );
                } else {
                  // It's a Book
                  setReadingList((prevList) =>
                    prevList.map((item) =>
                      item.book.id === updatedData.id
                        ? { ...item, book: updatedData }
                        : item
                    )
                  );
                }
              }}
            />
          )}
    </Box>
  );
};

const ProfileCard = ({
  data,
  readingList,
}: {
  data: User;
  readingList: ReadingList[];
}) => {
  // Calculate reading statistics
  const booksRead = readingList.filter((book) => book.isFinished).length;
  const booksToRead = readingList.filter((book) => !book.isFinished).length;
  const totalBooks = readingList.length;

  return (
    <Box
      maxW="4xl"
      mx="auto"
      bg="darkGray"
      rounded="xl"
      overflow="hidden"
      boxShadow="2xl"
      border="1px solid"
      borderColor="metallic"
      position="relative"
    >
      <Box
        h="200px"
        bg="linear-gradient(to right, #2c5282, #4a5568)"
        position="relative"
      >
        <Image
          h="full"
          w="full"
          objectFit="cover"
          src="https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
          opacity="0.6"
        />
        <Box
          position="absolute"
          bottom="0"
          left="0"
          right="0"
          h="100px"
          bg="linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
        />
      </Box>

      <Flex justify="center" mt="-16" position="relative">
        <Avatar
          size="2xl"
          src="./public/images/Profile_Placeholder.jpg"
          border="4px solid"
          borderColor="background"
          boxShadow="lg"
        />
    
      </Flex>

      <Box p={8}>
        <Stack spacing={4} align="center" mb={6}>
          <Heading fontSize="3xl" color="white" fontWeight="bold">
            {data.username}
          </Heading>
          <Badge
            px={3}
            py={1}
            rounded="full"
            colorScheme="blue"
            fontSize="sm"
            bg="metallic"
            color="gold"
          >
            {totalBooks > 0
              ? `${Math.round((booksRead / totalBooks) * 100)}% Completion`
              : "New Reader"}
          </Badge>
        </Stack>

        <Divider borderColor="metallic" mb={6} />

        <Flex justify="center" gap={8}>
          <StatBox
            label="Books Read"
            value={booksRead.toString()}
            icon={<StarIcon color="gold" />}
          />
          <StatBox
            label="Total Books"
            value={totalBooks.toString()}
            icon={<StarIcon color="metallic" />}
          />
          <StatBox
            label="To Read"
            value={booksToRead.toString()}
            icon={<StarIcon color="blue.400" />}
          />
        </Flex>
      </Box>
    </Box>
  );
};

const StatBox = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) => (
  <Box textAlign="center">
    <Flex align="center" justify="center" gap={2} mb={2}>
      {icon}
      <Text fontSize="2xl" fontWeight="bold" color="white">
        {value}
      </Text>
    </Flex>
    <Text color="gray.400" fontSize="sm">
      {label}
    </Text>
  </Box>
);

const ButtonCard = ({
  userId,
  openModal,
  editBool,
  setEditBool,
  readingList,
  setReadingList,
}: {
  userId: number;
  openModal: (book: Book) => void;
  editBool: boolean;
  setEditBool: React.Dispatch<React.SetStateAction<boolean>>;
  readingList: ReadingList[];
  setReadingList: React.Dispatch<React.SetStateAction<ReadingList[]>>;
}) => {
  const [showFinished, setShowFinished] = useState(true);

  return (
    <Box mt={8}>
      <Flex justify="center" gap={4} mb={6}>
        <Button
          colorScheme={showFinished ? "blue" : "gray"}
          variant={showFinished ? "solid" : "outline"}
          onClick={() => setShowFinished(true)}
          _hover={{ transform: "translateY(-2px)" }}
          transition="all 0.2s"
        >
          Finished Reading
        </Button>
        <Button
          colorScheme={!showFinished ? "blue" : "gray"}
          textColor={"white"}
          variant={!showFinished ? "solid" : "outline"}
          onClick={() => setShowFinished(false)}
          _hover={{ transform: "translateY(-2px)" }}
          transition="all 0.2s"
        >
          To Be Read
        </Button>
      </Flex>

      <Flex align="center" justify="center" gap={4} mb={6}>
        <Text color="white" fontSize="sm">
          Edit Mode
        </Text>
        <Switch
          size="lg"
          colorScheme="blue"
          isChecked={editBool}
          onChange={() => setEditBool(!editBool)}
        />
      </Flex>

      <BookShowcase
        readingList={readingList}
        showFinished={showFinished}
        openModal={openModal}
      />
    </Box>
  );
};

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

  return (
    <Box
      bg="darkGray"
      rounded="xl"
      p={6}
      border="1px solid"
      borderColor="metallic"
      boxShadow="xl"
    >
      <Heading
        size="lg"
        color="white"
        textAlign="center"
        mb={8}
        position="relative"
        _after={{
          content: '""',
          position: "absolute",
          bottom: "-10px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "100px",
          height: "2px",
          bg: "gold",
        }}
      >
        {showFinished ? "Finished Books" : "Books to Read"}
      </Heading>

      <Flex flexWrap="wrap" justify="center" gap={8}>
        {filteredBooks.length > 0 ? (
          filteredBooks.map((list) => (
            <Box
              key={list.id}
              maxW="250px"
              bg="background"
              rounded="lg"
              overflow="hidden"
              border="1px solid"
              borderColor="metallic"
              transition="all 0.3s"
              _hover={{
                transform: "translateY(-5px)",
                boxShadow: "xl",
                borderColor: "gold",
              }}
            >
              {list.book.image && (
                <>
                  <Image
                    src={list.book.image}
                    alt={list.book.title}
                    onClick={() => openModal(list.book)}
                    cursor="pointer"
                    h="300px"
                    w="100%"
                    objectFit="cover"
                  />
                  <Box p={4}>
                    <Text
                      color="white"
                      fontSize="lg"
                      fontWeight="medium"
                      noOfLines={2}
                    >
                      {list.book.title}
                    </Text>
                  </Box>
                </>
              )}
            </Box>
          ))
        ) : (
          <Text color="gray.400" fontSize="lg">
            No books found
          </Text>
        )}
      </Flex>
    </Box>
  );
};

export default MyProfile;
