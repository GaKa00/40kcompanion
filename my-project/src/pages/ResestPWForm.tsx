import { useState } from "react";
import axios from "axios";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/password-reset",
        { email }
      );
      setMessage(response.data.message);
    } catch (error) {
      setMessage("Error sending password reset email");
    }
  };

  return (
    <Container
      bgImage="url('./public/images/LandingImages/signupIn.jpg')"
      bgSize="cover"
      bgPosition="center"
      minH="100vh"
      maxW="100vw"
      py={12}
      px={6}
    >
      <Flex minH="100vh" align="center" justify="center">
        <Stack spacing={8} mx="auto" maxW="lg">
          <Box
            rounded="lg"
            bg={useColorModeValue("gray.600", "white")}
            shadow="lg"
            p={8}
            width={{ base: "90%", sm: "80%", md: "500px" }}
            backdropFilter="blur(10px)"
            boxShadow="lg"
          >
            <Stack spacing={4} align="center">
              <Heading fontSize="2xl" color="orange.400">
                Forgot Your Password?
              </Heading>
              <Text fontSize="md" color="white">
                Enter your email below to receive a password reset link.
              </Text>
              <form onSubmit={handleSubmit}>
                <FormControl id="email" isRequired>
                  <FormLabel color="orange.300">Email Address</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    focusBorderColor="orange.500"
                  />
                </FormControl>

                <Stack spacing={6} align="center" mt={4}>
                  <Button
                    type="submit"
                    bg="orange.400"
                    color="black"
                    _hover={{ bg: "orange.500" }}
                    width="full"
                  >
                    Send Reset Link
                  </Button>

                  {message && (
                    <Text
                      mt={4}
                      color={
                        message.includes("Error") ? "red.500" : "green.500"
                      }
                      fontWeight={"bold"}
                      fontSize="lg"
                    >
                      {message}
                    </Text>
                  )}
                </Stack>
              </form>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </Container>
  );
};

export default ForgotPassword;
