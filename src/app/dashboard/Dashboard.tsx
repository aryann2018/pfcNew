"use client";
import {
  Avatar,
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaBell } from "react-icons/fa";
import { FiMenu, FiSearch } from "react-icons/fi";
import { PiUserList } from "react-icons/pi";

import React from "react";
import { PFCColors } from "../common/PFCColors";

interface DashboardProps {
  children: any;
}

const Dashboard = ({ children }: DashboardProps) => {
  const sidebar = useDisclosure();

  const NavItem = (props: any) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        mx="2"
        rounded="md"
        py="3"
        cursor="pointer"
        color={PFCColors.GRAY_100}
        fontSize={18}
        _hover={{
          bg: "blackAlpha.300",
          color: "whiteAlpha.900",
        }}
        role="group"
        fontWeight="800"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mr="2"
            boxSize="6"
            _groupHover={{
              color: "gray.300",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = (props: any) => (
    <Box
      as="nav"
      pos="fixed"
      top="16"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="brand.GRAY_900"
      borderColor="blackAlpha.300"
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Stack
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <Flex h="8" />
        <NavItem icon={PiUserList}>Clients</NavItem>
      </Stack>
    </Box>
  );
  return (
    <Box
      as="section"
      bg="gray.50"
      _dark={{ bg: "gray.700" }}
      height={"calc(100vh - 64px)"}
    >
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Box p={"8"} />
        <Box as="main" p="4">
          {children}
        </Box>
      </Box>
    </Box>
  );
};
export default Dashboard;
