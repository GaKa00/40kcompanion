import { Box, Container, Heading, Image, Text } from '@chakra-ui/react'
import React from 'react'

const ShowcaseFeatures = () => {
  return (
    <div>
      <NewbookShowcase/>
    </div>
  )
}

export default ShowcaseFeatures


const NewbookShowcase = () => {
    return (
      <Container maxW={"9xl"} bg="gray" maxH={"9xl"}>
        <Heading
          pt="6rem"
          pr="2rem"
          fontWeight={500}
          fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}
        >
          <Text>
            <Box>
              <Image>
                
              </Image>
            </Box>
          </Text>
          Keep Track Of The Newest Releases,
        </Heading>
        <Text>
          Stay updated on the latest additions to the Warhammer 40k library with
          our curated selection of cutting-edge releases. Dive into our 
          collection, showcasing the newest narratives, characters, and
          conflicts Whether you're a seasoned veteran or a newcomer to
          the Warhammer universe, 'The Library' is sure to be your beacon through the vast 40k universe.
        </Text>
      </Container>
    );

}