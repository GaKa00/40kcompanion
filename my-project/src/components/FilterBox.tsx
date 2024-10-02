import { Box, Checkbox, CheckboxGroup, Flex, Spacer, Stack, Text } from "@chakra-ui/react";
import React from "react";

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
  const [value, setValue] = React.useState([]);

  return (
    <Box>
      <Text color={"white"}>Factions</Text>
      <CheckboxGroup value={value} onChange={setValue}>
        <Stack direction="row">
          <Checkbox value="1" color={"white"}>
            Adeptus Astartes
          </Checkbox>
          <Checkbox value="2" color={"white"}>
            Adeptus Custodes
          </Checkbox>
          <Checkbox value="3" color={"white"}>
            Adeptus Mechanicus
          </Checkbox>
          <Checkbox value="4" color={"white"}>
            Adepta Sororitas
          </Checkbox>
          <Checkbox value="5" color={"white"}>
            Astra Militarum
          </Checkbox>
          <Spacer />
          <Checkbox value="6" color={"white"}>
            Chaos Space Marines
          </Checkbox>
          <Checkbox value="7" color={"white"}>
            Aeldari
          </Checkbox>
          <Checkbox value="8" color={"white"}>
            Drukhari
          </Checkbox>
          <Checkbox value="9" color={"white"}>
            Necrons
          </Checkbox>
          <Checkbox value="10" color={"white"}>
            Orks
          </Checkbox>
          <Checkbox value="11" color={"white"}>
            T'au
          </Checkbox>
          <Checkbox value="12" color={"white"}>
            Tyranids
          </Checkbox>
        </Stack>
      </CheckboxGroup>
    </Box>
  );
};

const SeriesFilter = () => {
  const [value, setValue] = React.useState([]);

  return (
    <Box>
      <Text color={"white"}>Series</Text>
      <CheckboxGroup value={value} onChange={setValue}>
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
  const [value, setValue] = React.useState([]);

  return (
    <Box>
      <Text color={"white"}>Omnibus</Text>

      <CheckboxGroup value={value} onChange={setValue}>
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
