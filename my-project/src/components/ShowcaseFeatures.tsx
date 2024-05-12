import { Box, Container, Heading, Image, Text, Grid, GridItem } from '@chakra-ui/react';
import React from 'react';

import { FeatureType } from '../types/types';

const ShowcaseFeatures = () => {
  return (
    <Container maxW="9xl" bg="gray.100" py={12}>
      <Heading textAlign="center" mb={8}>Explore Our Features</Heading>
      <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={8}>
        <Feature
          title="Staying Updated with New Books"
          text="Stay updated on the latest additions to the Warhammer 40k library with our curated selection of cutting-edge releases."
          image="/images/new_books.jpg"
        />
        <Feature
          title="Mark Books as Read or Add to Your Reading List"
          text="Keep track of books you've read or create a reading list for future enjoyment."
          image="/images/reading_list.jpg"
        />
        <Feature
          title="Get Recommendations Based on Your Previous Reads"
          text="Discover new books tailored to your interests with personalized recommendations."
          image="/images/recommendations.jpg"
        />
        <Feature
          title="Write Quotes, Reviews, and Summaries"
          text="Record your thoughts and insights about your favorite books for future reference."
          image="/images/write_notes.jpg"
        />
      </Grid>
    </Container>
  );
};



const Feature= ({ title, text, image }: FeatureType) => {
  return (
    <GridItem>
      <Box p={6} borderWidth="1px" borderRadius="lg" boxShadow="md" bg="white">
        <Image src={image} alt={title} borderRadius="md" mb={4} />
        <Heading fontSize="xl" mb={2}>{title}</Heading>
        <Text fontSize="md" mb={4}>{text}</Text>
      </Box>
    </GridItem>
  );
};

export default ShowcaseFeatures;
