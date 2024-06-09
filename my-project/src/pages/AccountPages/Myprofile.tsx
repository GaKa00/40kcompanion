import React from 'react'
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
  Checkbox,
  IconButton,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";



const Myprofile = ()  => {
  return (
    <div
      className="">
      <ProfileCard />
      <ButtonCard />
      {/* <ToggleableBookList /> */}
    </div>
  );
}

const ProfileCard = () => {
  return (
    <>
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
                Miriya
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
              </Text>
              <Text fontSize={"md"} color={"gray.500"}>
                Books Read
              </Text>
            </Stack>
          </Box>
        </Box>
      </Center>

     
    </>
  );
}



const ButtonCard = () => {
  return (
    <Box  p={4} shadow="md" rounded="lg">
      <Flex wrap="wrap" justifyContent="space-evenly">
        <Button colorScheme="blue" >All Books</Button>
        <Button colorScheme="teal">Finished Reading</Button>
        <Button colorScheme="purple">To Be Read</Button>
      </Flex>
    </Box>
  );
};

const ToggleableBookList = () => {
  // will show three lists of books: all, reading or read books, based on state
 
  
};



    // <Container maxW={"7xl"} bg={"gray.400"}>
    //   <VStack marginBottom={"lg"}>
    //     <Image
    //       src="./public/images/Profile_Placeholder.jpg"
    //       borderRadius="full"
    //       boxSize="200px"
    //       alt='Adepta Sororitas'
    //       m={""}
    //     />
    //     <Heading> Sister Miriya</Heading>
    //   </VStack>
    //   <HStack>
    //     <Box></Box>
    //     <Box></Box>
    //   </HStack>
    //   <HStack>
    //     <Box></Box>
    //     <Box></Box>
    //   </HStack>
    // </Container>
  


export default Myprofile
