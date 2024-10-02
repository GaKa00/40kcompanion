import { Box, Checkbox, CheckboxGroup, Spacer, Stack } from "@chakra-ui/react";
import React from "react";

const FilterBox = () => {
  return (
    <Box>
      <FactionFilter />
      <SeriesFilter />
      <OmnibusFilter />
    </Box>
  );
};

const FactionFilter = () => {
  const [value, setValue] = React.useState([]);

  return (
    <Box>
      <CheckboxGroup value={value} onChange={setValue}>
        <Stack direction="row">
          <Checkbox value="1">Adeptus Astartes</Checkbox>
          <Checkbox value="2">Adeptus Custodes</Checkbox>
          <Checkbox value="3">Adeptus Mechanicus</Checkbox>
          <Checkbox value="4">Adepta Sororitas</Checkbox>
          <Checkbox value="5">Astra Militarum</Checkbox>
          <Spacer />
          <Checkbox value="6">Chaos Space Marines</Checkbox>
          <Checkbox value="7">Aeldari</Checkbox>
          <Checkbox value="8">Drukhari</Checkbox>
          <Checkbox value="9">Necrons</Checkbox>
          <Checkbox value="10">Orks</Checkbox>
          <Checkbox value="11">T'au</Checkbox>
          <Checkbox value="12">Tyranids</Checkbox>
        </Stack>
      </CheckboxGroup>
    </Box>
  );
};

const SeriesFilter = () => {
  const [value, setValue] = React.useState([]);

  return (
    <CheckboxGroup value={value} onChange={setValue}>
      <Stack direction="row">
        <Checkbox value="1">First</Checkbox>
        <Checkbox value="2">Second</Checkbox>
        <Checkbox value="3">Third</Checkbox>
      </Stack>
    </CheckboxGroup>
  );
};

const OmnibusFilter = () => {
  const [value, setValue] = React.useState([]);

  return (
    <CheckboxGroup value={value} onChange={setValue}>
      <Stack direction="row">
        <Checkbox value="omnibus">Omnibus</Checkbox>
      </Stack>
    </CheckboxGroup>
  );
};

export default FilterBox;
