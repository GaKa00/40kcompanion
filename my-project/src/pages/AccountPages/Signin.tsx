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
            bg={useColorModeValue("gray.300", "white")}
            bgImage="url('./public/images/dataslate.jpg')"
            bgSize="cover"
            bgRepeat="no-repeat"
            bgPosition="center"
            shadow="md"
            width={{ base: "80%", sm: "200px", md: "500px", lg: "400px" }}
            height={{ base: "80%", sm: "300px", md: "400px", lg: "600px" }}
            m={6}
            boxShadow="lg"
            p={8}
          >
            <Stack spacing={4}>
              <Stack align="center">
                <Heading fontSize="xl" color={"orange.300"}>
                  Enter Rememberancer Credientials
                </Heading>
              </Stack>
              <FormControl id="username" isRequired>
                <FormLabel color={"orange.300"}>Username</FormLabel>
                <Input
                  type="string"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  textColor={"white"}
                />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel color={"orange.300"}>Password</FormLabel>
                <Input
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  textColor={"white"}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align="start"
                  justify="space-between"
                >
                  <Checkbox onClick={toggleRemember} color={"orange.300"}>
                    Remember me
                  </Checkbox>
                </Stack>
                <ChakraLink
                  as={ReactRouterLink}
                  color="white"
                  to="/signup"
                  alignSelf="center"
                  _hover={{ textShadow: "0px 0px 10px orange" }}
                >
                  Don't have an account?
                </ChakraLink>
                <Link color={"orange.300"} alignSelf="center">
                  Forgot password?
                </Link>
                <Button
                  bg="orange.400"
                  color="black"
                  _hover={{
                    bg: "orange.500",
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
