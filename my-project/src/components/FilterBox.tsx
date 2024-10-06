import { Box, Button, Checkbox, CheckboxGroup, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
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
      <CheckboxGroup value={value} onChange={(value) => handleChange(value)}>
        <Stack direction="row">
          <Checkbox
            value=""
            color={"white"}
            isChecked={value === "astartes"}
            onChange={() => handleChange("astartes")}
          >
            Adeptus Astartes
          </Checkbox>
          <Checkbox
            value=""
            color={"white"}
            isChecked={value === "custodes"}
            onChange={() => handleChange("custodes")}
          >
            Adeptus Custodes
          </Checkbox>
          <Checkbox
            value=""
            color={"white"}
            isChecked={value === "mechanicus"}
            onChange={() => handleChange("mechanicus")}
          >
            Adeptus Mechanicus
          </Checkbox>
          <Checkbox
            value=""
            color={"white"}
            isChecked={value === "sororitas"}
            onChange={() => handleChange("sororitas")}
          >
            Adepta Sororitas
          </Checkbox>
          <Checkbox
            value=""
            color={"white"}
            isChecked={value === "militarum"}
            onChange={() => handleChange("militarum")}
          >
            Astra Militarum
          </Checkbox>
          <Spacer />
          <Checkbox
            value=""
            color={"white"}
            isChecked={value === "chaos"}
            onChange={() => handleChange("chaos")}
          >
            Chaos Space Marines
          </Checkbox>
          <Checkbox
            value="aeldari"
            color={"white"}
            isChecked={value === "aeldari"}
            onChange={() => handleChange("aeldari")}
          >
            Aeldari
          </Checkbox>
          <Checkbox
            value=""
            color={"white"}
            isChecked={value === "drukhari"}
            onChange={() => handleChange("drukhari")}
          >
            Drukhari
          </Checkbox>
          <Checkbox
            value=""
            color={"white"}
            isChecked={value === "necrons"}
            onChange={() => handleChange("necrons")}
          >
            Necrons
          </Checkbox>
          <Checkbox
            value=""
            color={"white"}
            isChecked={value === "orks"}
            onChange={() => handleChange("orks")}
          >
            Orks
          </Checkbox>
          <Checkbox
            value=""
            color={"white"}
            isChecked={value === "tau"}
            onChange={() => handleChange("tau")}
          >
            T'au
          </Checkbox>
          <Checkbox
            value=""
            color={"white"}
            isChecked={value === "tyranids"}
            onChange={() => handleChange("tyranids")}
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
    <Box>
      <Text color={"white"}>Series</Text>
      <CheckboxGroup value={value} onChange={handleChange}>
        <Stack direction="row">
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
    <Box>
      <Text color={"white"}>Omnibus</Text>

      <CheckboxGroup value={value} onChange={handleChange}>
        <Stack direction="row">
          <Checkbox value="" color={"white"}
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
