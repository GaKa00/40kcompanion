import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  
  useColorModeValue,
  Container,
  Flex,
} from "@chakra-ui/react";
import React from "react";

const ResetPassword = () => {
  const { token } = useParams();
  console.log("Token from URL:", token);

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/password-reset/${token}`,
        { newPassword }
      );
      setMessage(response.data.message);
    } catch (error: any) {
      setMessage(`Error resetting password: ${error.message}`);
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
                Reset Your Password
              </Heading>
              <Text fontSize="md" color="white">
                Enter your new password below to reset it.
              </Text>
              <form onSubmit={handleSubmit}>
                <FormControl id="newPassword" isRequired>
                  <FormLabel color="orange.300">New Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    focusBorderColor="orange.500"
                  />
                </FormControl>

                <Stack spacing={6} align="center" mt={4}>
                  <Button
                    type="submit"
                    bg="orange.400"
                    color="white"
                    _hover={{ bg: "orange.500" }}
                    width="full"
                  >
                    Reset Password
                  </Button>

                  {message && (
                    <Text
                      mt={4}
                      color={
                        message.includes("Error") ? "red.500" : "green.500"
                      }
                      fontSize="lg"
                      fontWeight={"bold"}
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

export default ResetPassword;
