import { Box, Radio, RadioGroup, Spacer, Stack } from '@chakra-ui/react'
import React from 'react'

const FilterBox = () => {
      const [value, setValue] = React.useState('1')
  return (
    <Box>

<FactionFilter/>
<SeriesFilter/>
<OmnibusFilter/>
    </Box>

  
  )
  
}



const FactionFilter = () => {
  const [value, setValue] = React.useState("1");
  return (
    <Box>
      <RadioGroup onChange={setValue} value={value}>
        <Stack direction="row">
          <Radio value="1">Adeptus Astartes</Radio>
          <Radio value="2">Adeptus Custodes</Radio>
          <Radio value="3">Adeptus Mechanicus</Radio>
          <Radio value="4">Adepta Sororitas</Radio>
          <Radio value="5">Astra Militarum</Radio>
          <Spacer />
          <Radio value="6">Chaos Space Marines</Radio>
          <Radio value="7">Aeldari</Radio>
          <Radio value="8">Drukhari</Radio>
          <Radio value="8">Nekrons</Radio>
          <Radio value="8">Orks</Radio>
          <Radio value="8">T'au</Radio>
          <Radio value="8">Tyranids</Radio>
        </Stack>
      </RadioGroup>
    </Box>
  );
};


const SeriesFilter = () => {
  const [value, setValue] = React.useState("1");
  return (
    <RadioGroup onChange={setValue} value={value}>
      <Stack direction="row">
        <Radio value="1">First</Radio>
        <Radio value="2">Second</Radio>
        <Radio value="3">Third</Radio>
      </Stack>
    </RadioGroup>
  );
};



const OmnibusFilter = () => {
  const [value, setValue] = React.useState("1");
  return (
    <RadioGroup onChange={setValue} value={value}>
      <Stack direction="row">
        <Radio value="omnibus">Omnibus</Radio>
      </Stack>
    </RadioGroup>
  );
};

export default FilterBox
