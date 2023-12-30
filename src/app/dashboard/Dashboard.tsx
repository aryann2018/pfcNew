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
import { FaBowlFood } from "react-icons/fa6";

import React from "react";
import { PFCColors } from "../common/PFCColors";
import { useRouter } from "next/navigation";
import { Image } from "@chakra-ui/react";

const navItems = [
  {
    label: "Dashboard",
    icon: PiUserList,
    route: "/dashboard/clients",
  },
  {
    label: "Create new Diet Template",
    icon: FaBowlFood,
    route: "/dashboard/dietplans/new",
  },
];

interface DashboardProps {
  children: any;
}

const Dashboard = ({ children }: DashboardProps) => {
  const sidebar = useDisclosure();
  const router = useRouter();

  const NavItem = (props: any) => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        paddingX={"16px"}
        rounded="md"
        py="3"
        cursor="pointer"
        color={PFCColors.GRAY_100}
        fontSize={16}
        _hover={{
          bg: "blackAlpha.300",
          color: "whiteAlpha.900",
        }}
        role="group"
        fontWeight="500"
        transition=".15s ease"
        {...rest}
        onClick={() => {
          props.onClick();
        }}
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
      as="div"
      pos="fixed"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg="brand.GRAY_900"
      borderColor="blackAlpha.300"
      borderRightWidth="1px"
      w="72"
      {...props}
    >
      <Stack as="nav" aria-label="Main Navigation">
        <Box paddingY={"12px"} />
        <Flex direction={"row"} alignItems={"center"} paddingX={"16px"}>
          <Image src="/images/logo.svg" alt="Logo" height="40px" />
        </Flex>
        <Box paddingY={"12px"} />
        {navItems.map((navItem) => (
          <NavItem
            key={navItem.label}
            icon={navItem.icon}
            onClick={() => {
              router.push(navItem.route);
            }}
          >
            {navItem.label}
          </NavItem>
        ))}
      </Stack>
    </Box>
  );
  return (
    <Box
      as="section"
      bg="white"
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
      <Box
        ml={{ base: 0, md: 72 }}
        transition=".3s ease"
        background={"#101828"}
      >
        <Box
          as="main"
          p="8"
          borderTopLeftRadius={"40px"}
          background={"white"}
          overflow={"hidden"}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
export default Dashboard;
