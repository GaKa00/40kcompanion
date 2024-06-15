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
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";
import axios from "axios";

export default function Signin() {

  // const login = async (e) => {
  //   e.preventDefault()
  //   try {
  //     const response = axios.post('/register', {username, email, password});
  //     localStorage.setItem('token', (await response).data.token)
  //   } catch (error) {
  //     console.log(error)
      
  //   }

  // }
  
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
      // onSubmit={login}
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
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align="start"
                  justify="space-between"
                >
                  <Checkbox>Remember me</Checkbox>
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
