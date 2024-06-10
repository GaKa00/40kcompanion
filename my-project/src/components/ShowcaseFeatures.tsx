import { Box, Container, Heading, Text, Grid, Flex } from "@chakra-ui/react";
import React from "react";



const features = [
  {
    title: "Staying Updated with New Books",
    text: "Stay updated on the latest additions to the Warhammer 40k library with our curated selection of cutting-edge releases.",
    image: "./public/images/LandingImages/appCard1.jpg",
  },
  {
    title: "Mark Books as Read or Add to Your Reading List",
    text: "Keep track of books you've read or create a reading list for future enjoyment.",
    image: "./public/images/LandingImages/appCard2.jpg",
  },
  {
    title: "Get Recommendations Based on Your Previous Reads",
    text: "Discover new books tailored to your interests with personalized recommendations.",
    image: "./public/images/LandingImages/appCard3.jpg",
  },
  {
    title: "Write Quotes, Reviews, and Summaries",
    text: "Record your thoughts and insights about your favorite books for future reference.",
    image: "./public/images/LandingImages/HeroImg.jpg",
  },
];

const ShowcaseFeatures = () => {
  return (
    <Container maxW="9xl" bg="gray.100" py={12}>
      <Heading textAlign="center" mb={8}>
        Explore Our Features
      </Heading>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
        {features.map((feature, index) => (
          <Box
            key={index}
            position="relative"
            bgImage={`url(${feature.image})`}
            bgSize="cover"
           
            height={{ base: "200px", md: "300px" }}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="md"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              bg="rgba(0, 0, 0, 0.4)" // Adjust the opacity here
              zIndex="1"
            />
            <Flex
              position="relative"
              zIndex="2"
              direction="column"
              align="center"
              textAlign="center"
              color="white"
              px={4}
            >
              <Heading as="h3" size="lg" mb={2}>
                {feature.title}
              </Heading>
              <Text fontSize="md">{feature.text}</Text>
            </Flex>
          </Box>
        ))}
      </Grid>
    </Container>
  );
};

export default ShowcaseFeatures;
