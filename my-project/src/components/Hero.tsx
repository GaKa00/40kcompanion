"use client";


// Imports
import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Image,
  IconButton,
 
} from "@chakra-ui/react";
import React from "react";
import { Link as ReactRouterLink } from "react-router-dom";
import { Link as ChakraLink, LinkProps } from "@chakra-ui/react";



// Hero Component

export default function CallToActionWithVideo() {
  return (
    <Container maxW={"7xl"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}
          >
            <Text
            
              fontSize={{ base: "2xl", sm: "4xl", lg: "6xl" }}
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "red.400",
                zIndex: -1,
              }}
              color={"white"}
            >
              The Library
            </Text>
            <br />
            <Text as={"span"} color={"red.400"}>
              Keep track of your 40K Reading
            </Text>
          </Heading>
          <Text color={"gray.200"}>
            The Library is a comprehensive reading companion for the many books in the Warhammer 40K Universe.
            Tired of searching for what book to read?  Is your dataslate full of information, and you need a place to write down
            the records of those epic battles you've read about? <br /><br />
              Do not fear, for The Library is here.
          
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <Button
              rounded={"full"}
              size={"lg"}
              fontWeight={"normal"}
              px={6}
              colorScheme={"red"}
              bg={"red.400"}
              _hover={{ bg: "red.500" }}
            >
              <ChakraLink as={ReactRouterLink} to="/signup">
                Get started
              </ChakraLink>
            </Button>
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Box
            position={"relative"}
            height={"300px"}
            rounded={"2xl"}
            boxShadow={"2xl"}
            width={"full"}
            overflow={"hidden"}
          >
            <IconButton
              aria-label={"Play Button"}
              variant={"ghost"}
              _hover={{ bg: "transparent" }}
              size={"lg"}
              color={"white"}
              position={"absolute"}
              left={"50%"}
              top={"50%"}
              transform={"translateX(-50%) translateY(-50%)"}
            />
            <Image
              alt={"Hero Image"}
              fit={"cover"}
              align={"center"}
              w={"100%"}
              h={"100%"}
              src="./public/images/LandingImages/appCard4.jpg"
            />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}



