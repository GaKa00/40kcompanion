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
  Skeleton,
  SkeletonText,
  SimpleGrid,
  HStack,
  VStack,
} from "@chakra-ui/react";
import { EditIcon, StarIcon } from "@chakra-ui/icons";
import axios from "axios";
import { Book, ReadingList, User } from "../../types/types";
import Footer from "../../components/ui/Footer";
import ReadingListModal from "../../components/Modal/RLModal";
import EditedModal from "../../components/Modal/EditModeModal";
import { getUser } from "../../utils/renderFetches";
import Navbar from "../../components/ui/Navbar";

const LoadingBookShowcase = ({
  onReadingListUpdate,
}: {
  onReadingListUpdate?: (updatedList: ReadingList) => void;
}) => (
  <Box
    bg="darkGray"
    rounded="xl"
    p={6}
    border="1px solid"
    borderColor="metallic"
    boxShadow="xl"
  >
    <SkeletonText noOfLines={1} width="200px" mx="auto" mb={8} />
    <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing={6}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Box key={i}>
          <Skeleton height="300px" mb={4} />
          <SkeletonText noOfLines={2} />
        </Box>
      ))}
    </SimpleGrid>
  </Box>
);

const MyProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [editBool, setEditBool] = useState<boolean>(false);
  const [readingList, setReadingList] = useState<ReadingList[]>([]);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingReadingList, setIsLoadingReadingList] = useState(true);
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
      setIsLoadingUser(true);
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
        setIsLoadingUser(false);
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
      } finally {
        setIsLoadingUser(false);
      }
    };
    fetchUserData();
  }, [toast]);

  // Fetch reading list when user is available
  useEffect(() => {
    if (user?.id) {
      setIsLoadingReadingList(true);
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
          })
          .finally(() => {
            setIsLoadingReadingList(false);
          });
      }
    }
  }, [user?.id, toast]);

  const LoadingProfileCard = () => (
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
      <Skeleton h="200px" />
      <Flex justify="center" mt="-16" position="relative">
        <Skeleton rounded="full" w="128px" h="128px" />
      </Flex>
      <Stack spacing={4} align="center" mb={6}>
        <SkeletonText noOfLines={1} width="200px" />
        <Skeleton width="150px" height="24px" rounded="full" />
      </Stack>
      <Divider borderColor="metallic" mb={6} />
      <Flex justify="center" gap={8}>
        {[1, 2, 3].map((i) => (
          <Box key={i} textAlign="center">
            <Skeleton width="60px" height="32px" mb={2} />
            <SkeletonText noOfLines={1} width="80px" />
          </Box>
        ))}
      </Flex>
    </Box>
  );

  return (
    <Box minH="100vh" bg="background">
      <Navbar />
      <Container maxW="container.xl" py={8}>
        {isLoadingUser ? (
          <LoadingProfileCard />
        ) : user ? (
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
              Error loading profile. Please try again.
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
  const [isLoadingReadingList, setIsLoadingReadingList] = useState(true);

  const handleReadingListUpdate = (updatedList: ReadingList) => {
    setReadingList((prevList) =>
      prevList.map((item) => (item.id === updatedList.id ? updatedList : item))
    );
  };

  useEffect(() => {
    if (readingList.length > 0) {
      setIsLoadingReadingList(false);
    }
  }, [readingList]);

  return (
    <Box mt={8}>
      <Flex justify="center" gap={4} mb={6}>
        <Button
          colorScheme={showFinished ? "blue" : "gray"}
          textColor={"white"}
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

      {isLoadingReadingList ? (
        <LoadingBookShowcase onReadingListUpdate={handleReadingListUpdate} />
      ) : (
        <BookShowcase
          readingList={readingList}
          showFinished={showFinished}
          openModal={openModal}
          onReadingListUpdate={handleReadingListUpdate}
        />
      )}
    </Box>
  );
};

const BookCard = ({
  list,
  openModal,
  onRatingChange,
}: {
  list: ReadingList;
  openModal: (book: Book) => void;
  onRatingChange: (rating: number) => void;
}) => {
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isRating, setIsRating] = useState(false);
  const toast = useToast();

  const handleRatingClick = async (rating: number) => {
    if (isRating) return;

    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const userId = localStorage.getItem("uid") || sessionStorage.getItem("uid");

    // Debug logging
    console.log("Auth check:", {
      hasToken: !!token,
      userId,
      listId: list.id,
      listUserId: list.userId,
    });

    if (!token || !userId) {
      toast({
        title: "Authentication Error",
        description: "Please log in to rate books",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Verify that the user owns this reading list entry
    if (Number(userId) !== list.userId) {
      console.error("User ID mismatch:", {
        currentUserId: userId,
        listUserId: list.userId,
      });
      toast({
        title: "Access Denied",
        description: "You can only rate your own books",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsRating(true);
    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/${userId}/reading-list/${list.id}/rating`,
        { rating },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Rating update response:", response.data);

      // Update the local state with the response data
      onRatingChange(rating);

      toast({
        title: "Rating updated",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error: any) {
      console.error("Error updating rating:", {
        error: error.response?.data || error.message,
        status: error.response?.status,
        userId,
        listId: list.id,
      });

      let errorMessage = "Please try again";
      if (error.response?.status === 403) {
        errorMessage = "You don't have permission to rate this book";
      } else if (error.response?.status === 401) {
        errorMessage = "Please log in again";
      }

      toast({
        title: "Error updating rating",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setIsRating(false);
    }
  };

  return (
    <Box
      w="220px"
      h="380px"
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
      display="flex"
      flexDirection="column"
    >
      {list.book.image ? (
        <>
          <Box h="300px" position="relative">
            <Image
              src={list.book.image}
              alt={list.book.title}
              onClick={() => openModal(list.book)}
              cursor="pointer"
              h="100%"
              w="100%"
              objectFit="cover"
            />
          </Box>
          <Box p={4} flex="1" display="flex" flexDirection="column" gap={2}>
            <Text
              color="white"
              fontSize="md"
              fontWeight="medium"
              noOfLines={2}
              textAlign="center"
              w="100%"
            >
              {list.book.title}
            </Text>
            <HStack spacing={1} justify="center">
              {[1, 2, 3, 4, 5].map((star) => (
                <Tooltip key={star} label={`${star} stars`}>
                  <IconButton
                    aria-label={`Rate ${star} stars`}
                    icon={<StarIcon />}
                    size="sm"
                    colorScheme={
                      star <= (hoveredRating || list.rating || 0)
                        ? "yellow"
                        : "gray"
                    }
                    onClick={() => handleRatingClick(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    variant="ghost"
                    isDisabled={isRating}
                  />
                </Tooltip>
              ))}
            </HStack>
          </Box>
        </>
      ) : (
        <Box
          h="300px"
          bg="gray.700"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="gray.400">No image available</Text>
        </Box>
      )}
    </Box>
  );
};

const BookShowcase = ({
  readingList,
  showFinished,
  openModal,
  onReadingListUpdate,
}: {
  readingList: ReadingList[];
  showFinished: boolean;
  openModal: (book: Book) => void;
  onReadingListUpdate: (updatedList: ReadingList) => void;
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
      minH="600px"
      display="flex"
      flexDirection="column"
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

      {filteredBooks.length > 0 ? (
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={6}
          justifyItems="center"
          flex="1"
        >
          {filteredBooks.map((list) => (
            <BookCard
              key={list.id}
              list={list}
              openModal={openModal}
              onRatingChange={(rating) => {
                onReadingListUpdate({ ...list, rating });
              }}
            />
          ))}
        </SimpleGrid>
      ) : (
        <Box
          flex="1"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="gray.900"
          borderRadius="lg"
          border="1px solid"
          borderColor="gray.700"
          mx="auto"
          my="auto"
          px={8}
          py={12}
          maxW="80%"
        >
          <VStack spacing={4}>
            <Text fontSize="xl" color="gray.400" textAlign="center">
              {showFinished
                ? "No finished books yet"
                : "No books in your reading list"}
            </Text>
            <Text color="gray.500" textAlign="center">
              {showFinished
                ? "Start reading some books to see them here"
                : "Add some books to your reading list to get started"}
            </Text>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default MyProfile;
