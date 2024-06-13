import { Box, Image, Stack, Text, SimpleGrid, Flex, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import { Book } from '../../types/types'







const Librarypage = () => {

 
 





  return (
    <VStack spacing={8} align="center">
      <Navbar/>
      {/* Placeholder for Hero Image */}
      <Box width="100%" p="5" boxShadow="md">
        <Text fontSize="2xl">Hero Image</Text>
      </Box>
      <ByFaction />
      <Flex justify="space-around" width="80%" mt="4">
        <Box width="40%">
          <LatestReleases />
          <SiegeofTerra />
        </Box>
        <Box width="40%">
          <Omnibuses />
        </Box>
      </Flex>
    </VStack>
  )
}

export default Librarypage

const LatestReleases = () => {
  return (
    <Box p="5" boxShadow="md" mb="4">
      <Text fontSize="xl">Latest Releases</Text>
      {/* Add content here */}
    </Box>
  )
}

const SiegeofTerra = () => {
  const books = [
    "./publicimages/LandingImages/appCard1.jpg",
    "./publicimages/LandingImages/appCard2.jpg",
    "./publicimages/LandingImages/appCard3.jpg",
    "./publicimages/LandingImages/appCard4.jpg"
  ];
  return (
    <Box p="5" boxShadow="md">
      <Text fontSize="xl">Siege of Terra</Text>

    

    </Box>
  )
}

const Omnibuses = () => {
  return (
    <Box p="5" boxShadow="md">
      <Text fontSize="xl">Omnibuses</Text>
      {/* Add content here */}
    </Box>
  )
}

const ByFaction = () => {
  const imagesFaction = ["AstartesLogo.jpg", "MechanicusLogo.jpg", "MilitarumLogo.jpg", "SororitasLogo.jpg", "NecronsLogo.jpg", "OrkZLogo.jpg", "TyranidsLogo.jpg"]
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





