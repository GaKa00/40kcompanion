import { Box, Button, Checkbox, CheckboxGroup, Flex, Stack, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useState } from "react";
import TagContext from "../utils/TagContext";

const FilterBox = () => {


 

  return (
    <Flex direction={"column"} gap={4} maxW={"1000px"}>
      <FactionFilter />
      <Flex>
        <SeriesFilter />
        <OmnibusFilter />
      </Flex>
    </Flex>
  );
};


const FactionFilter = () => {
  const [value, setValue] = useState<string>("");

  const { tag, setTag } = useContext(TagContext)!;

  const handleChange = (selectedValue: string) => {
    setValue(selectedValue);
    setTag(selectedValue);
    console.log(tag);
  };

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      borderColor="gray.600"
      bg="gray.900"
      boxShadow="lg"
      maxWidth="1000px"
      mx="auto"
      mt={6}
    >
      <Text
        color="white"
        fontSize="lg"
        fontWeight="bold"
        mb={3}
        textAlign="center"
      >
        Factions
      </Text>
      <CheckboxGroup value={value} onChange={handleChange}>
        <Stack
          direction="row"
          wrap="wrap"
          spacing={4}
          justify="center"
          align="center"
        >
          {/* Row 1 */}
          <Checkbox
            value="astartes"
            colorScheme="blue"
            isChecked={value === "astartes"}
            onChange={() => handleChange("astartes")}
            _hover={{ transform: "scale(1.05)" }}
            textColor={"white"}
          >
            Adeptus Astartes
          </Checkbox>
          <Checkbox
            value="custodes"
            colorScheme="blue"
            isChecked={value === "custodes"}
            onChange={() => handleChange("custodes")}
            _hover={{ transform: "scale(1.05)" }}
            textColor={"white"}
          >
            Adeptus Custodes
          </Checkbox>
          <Checkbox
            value="mechanicus"
            colorScheme="blue"
            isChecked={value === "mechanicus"}
            onChange={() => handleChange("mechanicus")}
            _hover={{ transform: "scale(1.05)" }}
            textColor={"white"}
          >
            Adeptus Mechanicus
          </Checkbox>
          <Checkbox
            value="sororitas"
            colorScheme="blue"
            isChecked={value === "sororitas"}
            onChange={() => handleChange("sororitas")}
            _hover={{ transform: "scale(1.05)" }}
            textColor={"white"}
          >
            Adepta Sororitas
          </Checkbox>
          <Checkbox
            value="militarum"
            colorScheme="blue"
            isChecked={value === "militarum"}
            onChange={() => handleChange("militarum")}
            _hover={{ transform: "scale(1.05)" }}
            textColor={"white"}
          >
            Astra Militarum
          </Checkbox>

          <Checkbox
            value="chaos"
            colorScheme="purple"
            isChecked={value === "chaos"}
            onChange={() => handleChange("chaos")}
            _hover={{ transform: "scale(1.05)" }}
            textColor={"white"}
          >
            Chaos Space Marines
          </Checkbox>
          <Checkbox
            value="aeldari"
            colorScheme="purple"
            isChecked={value === "aeldari"}
            onChange={() => handleChange("aeldari")}
            _hover={{ transform: "scale(1.05)" }}
            textColor={"white"}
          >
            Aeldari
          </Checkbox>
          <Checkbox
            value="drukhari"
            colorScheme="purple"
            isChecked={value === "drukhari"}
            onChange={() => handleChange("drukhari")}
            _hover={{ transform: "scale(1.05)" }}
            textColor={"white"}
          >
            Drukhari
          </Checkbox>
          <Checkbox
            value="necrons"
            colorScheme="purple"
            isChecked={value === "necrons"}
            onChange={() => handleChange("necrons")}
            _hover={{ transform: "scale(1.05)" }}
            textColor={"white"}
          >
            Necrons
          </Checkbox>
          <Checkbox
            value="orks"
            colorScheme="purple"
            isChecked={value === "orks"}
            onChange={() => handleChange("orks")}
            _hover={{ transform: "scale(1.05)" }}
            textColor={"white"}
          >
            Orks
          </Checkbox>
          <Checkbox
            value="tau"
            colorScheme="purple"
            isChecked={value === "tau"}
            onChange={() => handleChange("tau")}
            _hover={{ transform: "scale(1.05)" }}
            textColor={"white"}
          >
            T'au
          </Checkbox>
          <Checkbox
            value="tyranids"
            colorScheme="purple"
            isChecked={value === "tyranids"}
            onChange={() => handleChange("tyranids")}
            _hover={{ transform: "scale(1.05)" }}
            textColor={"white"}
          >
            Tyranids
          </Checkbox>
        </Stack>
      </CheckboxGroup>
    </Box>
  );
};



const SeriesFilter = () => {
   const [value, setValue] = useState<string>("");
   const { setTag } = useContext(TagContext)!;

   const handleChange = (selectedValue: string) => {
     setValue(selectedValue);
     setTag(selectedValue);
   };



  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      borderColor="gray.600"
      bg="gray.900"
      boxShadow="lg"
      minWidth="750px"
      maxWidth="750px"
    >
      <Text
        color="white"
        fontSize="lg"
        fontWeight="bold"
        mb={3}
        textAlign="center"
      >
        Series
      </Text>
      <CheckboxGroup value={value} onChange={handleChange}>
        <Stack direction="row" justify={"center"}>
          <Checkbox value="" color={"white"}>
            First
          </Checkbox>
          <Checkbox value="" color={"white"}>
            Second
          </Checkbox>
          <Checkbox value="" color={"white"}>
            Third
          </Checkbox>
        </Stack>
      </CheckboxGroup>
    </Box>
  );
};

const OmnibusFilter = () => {
  const [value, setValue] = useState<string>("");

  const {  tag, setTag } = useContext(TagContext)!;

  const handleChange = (selectedValue: string) => {
    setValue(selectedValue);
    setTag(selectedValue);
     console.log(tag);
  };

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      borderColor="gray.600"
      bg="gray.900"
      boxShadow="lg"
      minW={"140px"}
      maxWidth="250px"
      minWidth="250px"
    >
      <Text
        color="white"
        fontSize="lg"
        fontWeight="bold"
        mb={3}
        textAlign="center"
      >
        Omnibus
      </Text>

      <CheckboxGroup value={value} onChange={handleChange}>
        <Stack direction="row" justify={"center"}>
          <Checkbox
            value=""
            color={"white"}
            isChecked={value === "omnibus"}
            onChange={() => handleChange("omnibus")}
          >
            Omnibus
          </Checkbox>
        </Stack>
      </CheckboxGroup>
    </Box>
  );
};

export default FilterBox;
