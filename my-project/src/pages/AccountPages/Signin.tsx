import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link as ReactRouterLink ,useNavigate} from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import axios from "axios";

export default function Signin() {



  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  const login = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/api/login", {
        username,
        password
      });

      if(remember) {
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("uid", response.data.userId)
      }
      else{
      sessionStorage.setItem("token", response.data.token);}
       sessionStorage.setItem("uid", response.data.userId);
      
        navigate('/library')
    } catch (error) {
      console.log(error);
    }
  }

  const toggleRemember = () => {
    setRemember((prevRemember) => !prevRemember);
  };
  
  
  return (
    <Container
      position="relative"
      bgImage="url('./public/images/LandingImages/signupIn.jpg')"
      bgSize="cover"
      bgPosition="center"
      height="100vh"
      maxW="100vw"
      style={{ margin: 0, padding: 0 }}
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
        Back to Home
      </Button>
      <Flex minH="100vh" align="center" justify="center">
        <Stack spacing={8} mx="auto" maxW="lg" py={12} px={6}>
          <Box
            rounded="lg"
            bg={useColorModeValue("white", "gray.700")}
            boxShadow="lg"
            p={8}
          >
            <Stack spacing={4}>
              <Stack align="center">
                <Heading fontSize="4xl">Sign in to your account</Heading>
                <Text fontSize="lg" color="gray.600">
                  to enjoy all of our cool{" "}
                  <Link color="blue.400">features</Link> ✌️
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
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align="start"
                  justify="space-between"
                >
                  <Checkbox onClick={toggleRemember}>Remember me</Checkbox>
                  <Link color="blue.400">Forgot password?</Link>
                </Stack>
                <ChakraLink
                  as={ReactRouterLink}
                  color="blue.500"
                  to="/signup"
                  alignSelf="center"
                >
                  Don't have an account?
                </ChakraLink>
                <Button
                  bg="blue.400"
                  color="white"
                  _hover={{
                    bg: "blue.500",
                  }}
                  onClick={login}
                >
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Container>
  );
}
