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
   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const navigate= useNavigate()
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
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
        bg="gray.500"
        color="white"
        _hover={{ bg: "gray.600" }}
      >
        Return to homepage
      </Button>
      <Flex minH="100vh" align="center" justify="center">
        <Stack
          spacing={8}
          mx="auto"
          maxW="auto"
          py={12}
          px={6}
          justify={"center"}
        >
          <Box
            rounded="lg"
            bg={useColorModeValue("gray.300", "white")}
            bgImage="url('./public/images/dataslate.jpg')"
            bgSize="cover"
            bgRepeat="no-repeat"
            bgPosition="center"
            shadow="md"
            width={{ base: "80%", sm: "200px", md: "500px", lg: "600px" }}
            height={{ base: "80%", sm: "300px", md: "600px", lg: "1000px" }}
            m={6}
            boxShadow="lg"
            p={8}
          >
            <Flex direction="column" align="center" height={"100%"}>
              <Stack
                spacing={2}
                height="90%"
                justify="space-between"
                width={"90%"}
              >
                <Stack align="center">
                  <Text fontSize="xl" color="orange.300" mt={8}>
                    Enter your credentials Rememberancer.
                  </Text>
                </Stack>
                <FormControl id="username" isRequired>
                  <FormLabel color={"orange.300"}>Display Name</FormLabel>
                  <Input
                    type="string"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    textColor={"white"}
                  />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel color={"orange.300"}>Email address</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    textColor={"white"}
                  />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel color={"orange.300"}>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      color={"white"}
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
                <FormControl id="confirmPassword" isRequired>
                  <FormLabel color="orange.300">Confirm Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      color={"white"}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <InputRightElement h="full">
                      <Button
                        variant="ghost"
                        onClick={() =>
                          setShowConfirmPassword(
                            (showConfirmPassword) => !showConfirmPassword
                          )
                        }
                      >
                        {showConfirmPassword ? <ViewIcon /> : <ViewOffIcon />}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg="orange.300"
                    color="black"
                    _hover={{ bg: "orange.500" }}
                    bottom={1}
                    onClick={register}
                    maxW={{ sm: "200px", lg: "100%" }}
                  >
                    Submit Credentials
                  </Button>
                </Stack>
              </Stack>
              <Stack pt={6}>
                <Text align="center" color={"orange.300"}>
                  Already registered?{" "}
                  <ChakraLink
                    as={ReactRouterLink}
                    color="white"
                    to="/signin"
                    _hover={{ textShadow: "0px 0px 5px white" }}
                  >
                    Login
                  </ChakraLink>
                </Text>
              </Stack>
            </Flex>
          </Box>
        </Stack>
      </Flex>
    </Container>
  );
};

export default Signup;
