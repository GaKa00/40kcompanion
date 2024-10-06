import { Box, Checkbox, CheckboxGroup, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useState } from "react";
import TagContext from "../utils/TagContext";

const FilterBox = () => {


 

  return (
  <Flex  
  direction={"column"}
  gap={4}>

      <FactionFilter />
      <SeriesFilter />
      <OmnibusFilter />
  </Flex>
   
  );
};




const FactionFilter = () => {
  const [value, setValue] =useState<string>("");
  
  const { tag, setTag } = useContext(TagContext)!;

const handleChange = (selectedValue : string) =>{
  setValue(selectedValue)
  setTag(selectedValue)
  console.log(tag);

}

  return (
    <Box>
      <Text color={"white"}>Factions</Text>
      <CheckboxGroup value={value} onChange={() => handleChange(value)}>
        <Stack direction="row">
          <Checkbox value="astartes" color={"white"}>
            Adeptus Astartes
          </Checkbox>
          <Checkbox value="custodes" color={"white"}>
            Adeptus Custodes
          </Checkbox>
          <Checkbox value="mechanicus" color={"white"}>
            Adeptus Mechanicus
          </Checkbox>
          <Checkbox value="sororitas" color={"white"}>
            Adepta Sororitas
          </Checkbox>
          <Checkbox value="militarum" color={"white"}>
            Astra Militarum
          </Checkbox>
          <Spacer />
          <Checkbox value="chaos" color={"white"}>
            Chaos Space Marines
          </Checkbox>
          <Checkbox value="aeldari" color={"white"}>
            Aeldari
          </Checkbox>
          <Checkbox value="drukhari" color={"white"}>
            Drukhari
          </Checkbox>
          <Checkbox value="necrons" color={"white"}>
            Necrons
          </Checkbox>
          <Checkbox value="orks" color={"white"}>
            Orks
          </Checkbox>
          <Checkbox value="tau" color={"white"}>
            T'au
          </Checkbox>
          <Checkbox value="tyranids" color={"white"}>
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
    <Box>
      <Text color={"white"}>Series</Text>
      <CheckboxGroup value={value} onChange={ () => handleChange(value)}>
        <Stack direction="row">
          <Checkbox value="1" color={"white"}>
            First
          </Checkbox>
          <Checkbox value="2" color={"white"}>
            Second
          </Checkbox>
          <Checkbox value="3" color={"white"}>
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
    <Box>
      <Text color={"white"}>Omnibus</Text>

      <CheckboxGroup value={value} onChange={handleChange}>
        <Stack direction="row">
          <Checkbox value="omnibus" color={"white"}>
            Omnibus
          </Checkbox>
        </Stack>
      </CheckboxGroup>
    </Box>
  );
};

export default FilterBox;
