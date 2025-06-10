import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  Stack,
  Text,
  IconButton,
  HStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { useState } from "react";
import TagContext from "../utils/TagContext";
import { CloseIcon } from "@chakra-ui/icons";

interface FilterOption {
  value: string;
  label: string;
  colorScheme?: "blue" | "purple";
}

interface FilterSectionProps {
  title: string;
  options: FilterOption[];
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  activeFilter: string;
  sectionId: string;
  onFilterChange: (sectionId: string, value: string) => void;
}

const FilterSection = ({
  title,
  options,
  width,
  minWidth,
  maxWidth,
  activeFilter,
  sectionId,
  onFilterChange,
}: FilterSectionProps) => {
  return (
    <Box
      p={4}
      borderWidth="1px"
      borderRadius="md"
      borderColor="gray.600"
      bg="gray.900"
      boxShadow="lg"
      width={width}
      minWidth={minWidth}
      maxWidth={maxWidth}
      position="relative"
    >
      <Text
        color="white"
        fontSize="lg"
        fontWeight="bold"
        mb={3}
        textAlign="center"
      >
        {title}
      </Text>
      <Stack
        direction="row"
        wrap="wrap"
        spacing={4}
        justify="center"
        align="center"
      >
        {options.map((option) => (
          <Checkbox
            key={option.value}
            value={option.value}
            colorScheme={option.colorScheme || "blue"}
            isChecked={activeFilter === option.value}
            onChange={() => onFilterChange(sectionId, option.value)}
            _hover={{ transform: "scale(1.05)" }}
            textColor="white"
          >
            {option.label}
          </Checkbox>
        ))}
      </Stack>
    </Box>
  );
};

const FilterBox = () => {
  const { tag, setTag } = useContext(TagContext)!;
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>(
    {}
  );

  const handleFilterChange = (sectionId: string, value: string) => {
    // If clicking the same filter, clear it
    if (activeFilters[sectionId] === value) {
      const newFilters = { ...activeFilters };
      delete newFilters[sectionId];
      setActiveFilters(newFilters);
      setTag("");
    } else {
      // Set the new filter and clear others
      setActiveFilters({ [sectionId]: value });
      setTag(value);
    }
  };

  const handleReset = () => {
    setActiveFilters({});
    setTag("");
  };

  const factionOptions: FilterOption[] = [
    { value: "astartes", label: "Adeptus Astartes", colorScheme: "blue" },
    { value: "custodes", label: "Adeptus Custodes", colorScheme: "blue" },
    { value: "mechanicus", label: "Adeptus Mechanicus", colorScheme: "blue" },
    { value: "sororitas", label: "Adepta Sororitas", colorScheme: "blue" },
    { value: "militarum", label: "Astra Militarum", colorScheme: "blue" },
    { value: "chaos", label: "Chaos Space Marines", colorScheme: "purple" },
    { value: "aeldari", label: "Aeldari", colorScheme: "purple" },
    { value: "drukhari", label: "Drukhari", colorScheme: "purple" },
    { value: "necrons", label: "Necrons", colorScheme: "purple" },
    { value: "orks", label: "Orks", colorScheme: "purple" },
    { value: "tau", label: "T'au", colorScheme: "purple" },
    { value: "tyranids", label: "Tyranids", colorScheme: "purple" },
  ];

  const seriesOptions: FilterOption[] = [
    { value: "horus heresy", label: "Horus Heresy", colorScheme: "blue" },
    { value: "gaunts ghosts", label: "Gaunt's Ghosts", colorScheme: "blue" },
    { value: "ciaphas cain", label: "Ciaphas Cain", colorScheme: "blue" },
  ];

  const omnibusOptions: FilterOption[] = [
    { value: "omnibus", label: "Omnibus" },
  ];

  return (
    <Flex direction={"column"} maxW={"1000px"}>
      {Object.keys(activeFilters).length > 0 && (
        <Button
          leftIcon={<CloseIcon />}
          colorScheme="red"
          variant="solid"
          onClick={handleReset}
          size="sm"
          alignSelf="center"
          mb={2}
          _hover={{ transform: "scale(1.05)" }}
          transition="all 0.2s"
        >
          Clear Filters
        </Button>
      )}
      <FilterSection
        title="Factions"
        options={factionOptions}
        maxWidth="1000px"
        activeFilter={activeFilters.factions || ""}
        sectionId="factions"
        onFilterChange={handleFilterChange}
      />
      <Flex>
        <FilterSection
          title="Series"
          options={seriesOptions}
          minWidth="750px"
          maxWidth="750px"
          activeFilter={activeFilters.series || ""}
          sectionId="series"
          onFilterChange={handleFilterChange}
        />
        <FilterSection
          title="Omnibus"
          options={omnibusOptions}
          minWidth="250px"
          maxWidth="250px"
          activeFilter={activeFilters.omnibus || ""}
          sectionId="omnibus"
          onFilterChange={handleFilterChange}
        />
      </Flex>
    </Flex>
  );
};

export default FilterBox;
