import { Box, Image, Stack, Text, SimpleGrid, Flex, VStack, HStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Book } from '../../types/types'
import axios from 'axios'







const Librarypage = () => {

 const [books, setBooks] = useState<Book[]>([]);

useEffect(() => {
  axios.get("http://localhost:3000/api/books")
    .then((response) => setBooks(response.data));
}, []);





  return (
    <VStack spacing={8} align="center">
      <Navbar />
      {/* Placeholder for Hero Image */}
      <Box
        position={"relative"}
        height={"900px"}
        rounded={"2xl"}
        boxShadow={"2xl"}
        width={"full"}
        overflow={"hidden"}
      >
        <Image
          alt={"Hero Image"}
          fit={"cover"}
          align={"center"}
          w={"100%"}
          h={"100%"}
          src="./public/images/LandingImages/alternativeHero.jpg"
        />
      </Box>
      <ByFaction />
      <Flex justify="space-around" width="80%" mt="4">
        <Box width="40%">
          <LatestReleases data={books} />
          <SiegeofTerra data={books} />
        </Box>
        <Box width="40%">
          <Omnibuses data={books} />
        </Box>
      </Flex>
    </VStack>
  );
}

export default Librarypage

interface dataProp  {
  data: Book[]
}

const LatestReleases = ({data}:dataProp) => {

  const showReleases = data.map((book) => {
    return (

      <img src={book.image} alt={book.title} />
    )

  })
  return (
    <Box p="5" boxShadow="md" mb="4">
      <Text fontSize="xl">Latest Releases</Text>
   <HStack gap="3">

      {showReleases}
   </HStack>
    </Box>
  )
}

const SiegeofTerra = ({ data }: dataProp) => {
  const showReleases = data.map((book) => {
    return <img src={book.image} alt={book.title} />;
  });

  return (
    <Box p="5" boxShadow="md">
      <Text fontSize="xl">Siege of Terra</Text>
    </Box>
  );
};

const Omnibuses = ({ data }: dataProp) => {
  const showReleases = data.map((book) => {
    return <img src={book.image} alt={book.title} />;
  });
  return (
    <Box p="5" boxShadow="md">
      <Text fontSize="xl">Omnibuses</Text>
      {/* Add content here */}
    </Box>
  );
};

const ByFaction = () => {
  const imagesFaction = [
    "images/FactionLogos/AstartesLogo.jpg",
    "images/FactionLogos/MechanicusLogo.jpg",
    "images/FactionLogos/MilitarumLogo.jpg",
    "images/FactionLogos/SororitasLogo.jpg",
    "images/FactionLogos/NecronsLogo.jpg",
    "images/FactionLogos/OrkzLogo.jpg",
    "images/FactionLogos/TyranidsLogo.jpg",
  ];
  const namesFaction = ["Adeptus Astartes", "Adeptus Mechanicus", "Astra Militarum", "Adepta Sororitas", "Necrons", "Orks", "Tyranids"]
  return (
    <Box width="100%" p="5" boxShadow="md">
      <Text fontSize="2xl" textAlign="center" mb="4">Factions</Text>
      <SimpleGrid columns={[1, 2, 3, 7]} spacing="20px">
        {imagesFaction.map((image, index) => (
          <VStack key={index} textAlign="center">
            <Image src={image} alt={namesFaction[index]} w={100} h={100} />
            <Text mt="2">{namesFaction[index]}</Text>
          </VStack>
        ))}
      </SimpleGrid>
    </Box>
  )
}





