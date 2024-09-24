import {
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Stack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  HStack,
  Link as ChakraLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";

import React, { useState } from "react";
import axios from "axios";


const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
const navigate= useNavigate()
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [username, setUsername] = useState("");


const register = async (e: React.FormEvent<HTMLButtonElement>) => {
  e.preventDefault();
  
  try {
    
    const response = await axios.post("http://localhost:3000/api/register", {
      username,
      email,
      password,
    });
    console.log(response);
    navigate('/signin')
   
  } catch (error) {
    console.log(error);
  }
};
  return (
    <Container
      position="relative"
      bgImage="url('./public/images/LandingImages/signupIn.jpg')"
      bgSize="cover"
      bgPosition="center"
      height="100vh"
      maxW="100vw"
      margin="0"
      padding="0"
     
    >
      <Button
        as={ReactRouterLink}
        to="/"
        position="absolute"
        top={4}
        left={4}
        bg="blue.500"
        color="white"
        _hover={{ bg: "blue.600" }}
      >

      </Button>
      <Flex minH="100vh" align="center" justify="center">
        <Stack spacing={8} mx="auto" maxW="xl" py={12} px={6}>
          <Box
            rounded="lg"
            bg={useColorModeValue("gray.300", "white")}
            boxShadow="lg"
            p={8}
          >
            <Stack spacing={4}>
              <Stack align="center">
                <Heading fontSize="4xl" textAlign="center">
                  Conscript
                </Heading>
                <Text fontSize="lg" color="gray.600">
                  to the Librarius Sanctorum.
                </Text>
              </Stack>
              <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  type="string"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormControl>
              <FormControl id="email" isRequired>
                <FormLabel>Email address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputRightElement h="full">
                    <Button
                      variant="ghost"
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  loadingText="Submitting"
                  size="lg"
                  bg="blue.400"
                  color="white"
                  _hover={{ bg: "blue.500" }}
                  onClick={register}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align="center">
                  Already a user?{" "}
                  <ChakraLink
                    as={ReactRouterLink}
                    color="blue.500"
                    to="/signin"
                  >
                    Login
                  </ChakraLink>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Container>
  );
};

export default Signup;
