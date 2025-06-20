"use client";

import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  Text,
  Container,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import React from "react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import { Link as ChakraLink } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
  to: string;
}

const NavLink = ({ children, to }: Props) => {
  return (
    <ChakraLink
      as={ReactRouterLink}
      to={to}
      px={4}
      py={2}
      fontWeight="semibold"
      color="white"
      position="relative"
      _hover={{
        textDecoration: "none",
        color: "gold",
        _after: {
          width: "100%",
          opacity: 1,
        },
      }}
      _after={{
        content: '""',
        position: "absolute",
        width: "0%",
        height: "2px",
        bottom: 0,
        left: 0,
        bg: "gold",
        transition: "all 0.3s ease",
        opacity: 0,
      }}
    >
      {children}
    </ChakraLink>
  );
};

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("uid");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("uid");
    navigate("/");
  };

  return (
    <Box
      bg="background"
      borderBottom="2px"
      borderColor="metallic"
      position="sticky"
      top={0}
      zIndex={1000}
      boxShadow="0 4px 6px rgba(0,0,0,0.2)"
    >
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <IconButton
            size="md"
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label="Open Menu"
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            variant="ghost"
            color="white"
            _hover={{ color: "gold" }}
          />

          <HStack spacing={8} alignItems="center">
            <ChakraLink
              as={ReactRouterLink}
              to="/"
              fontSize="2xl"
              fontWeight="bold"
              color="gold"
              position="relative"
              _hover={{
                textDecoration: "none",
                color: "white",
                _after: {
                  width: "100%",
                  opacity: 1,
                },
              }}
              _after={{
                content: '""',
                position: "absolute",
                width: "0%",
                height: "2px",
                bottom: -2,
                left: 0,
                bg: "white",
                transition: "all 0.3s ease",
                opacity: 0,
              }}
            >
              WCR
            </ChakraLink>

            <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
              <NavLink to="/library">Library</NavLink>
              <NavLink to="/profile">My Profile</NavLink>
            </HStack>
          </HStack>

          <Menu>
            <MenuButton
              as={Button}
              rounded="full"
              variant="ghost"
              cursor="pointer"
              minW={0}
              display="flex"
              alignItems="center"
              gap={2}
              color="white"
              backgroundColor="background"
              _hover={{ color: "gold" }}
              _active={{ color: "white", backgroundColor: "background" }}
              transition="all 0.2s"
            >
              <Avatar
                size="sm"
                src="/images/Profile_Placeholder.jpg"
                border="2px solid"
                borderColor="gold"
              />
              <Text display={{ base: "none", md: "block" }} fontWeight="medium">
                Profile
              </Text>
            </MenuButton>
            <MenuList bg="background" borderColor="metallic" borderWidth="2px">
              <MenuItem
                onClick={() => navigate("/profile")}
                _hover={{ color: "gold" }}
                color="white"
                backgroundColor="background"
                fontWeight="medium"
              >
                My Profile
              </MenuItem>
              <MenuItem
                onClick={() => navigate("/settings")}
                _hover={{ color: "gold" }}
                color="white"
                backgroundColor="background"
                fontWeight="medium"
              >
                Settings
              </MenuItem>
              <MenuDivider borderColor="metallic" />
              <MenuItem
                onClick={handleLogout}
                color="chaosRed"
                backgroundColor="background"
                fontWeight="medium"
                _hover={{ color: "chaosRed", opacity: 0.8 }}
              >
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>

        {isOpen && (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as="nav" spacing={4}>
              <NavLink to="/library">Library</NavLink>
              <NavLink to="/profile">My Profile</NavLink>
            </Stack>
          </Box>
        )}
      </Container>
    </Box>
  );
}
