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
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { PiUserList } from "react-icons/pi";
import { FaBowlFood, FaDumbbell } from "react-icons/fa6";
import { TiPinOutline, TiPin } from "react-icons/ti";
import React, { useEffect, useRef, useState } from "react";
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
    label: "Create Diet Template",
    icon: FaBowlFood,
    route: "/dashboard/dietplans/new",
  },
  {
    label: "Create Workout Template",
    icon: FaDumbbell,
    route: "/dashboard/workoutplans/new",
  },
];

interface DashboardProps {
  children: any;
}

const Dashboard = ({ children }: DashboardProps) => {
  const sidebarManager = useDisclosure();
  const router = useRouter();

  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false); // New state for sidebar status
  const [isSidebarPinned, setIsSidebarPinned] = useState(false); // New state for sidebar status
  const toggleSidebar = () => setIsSidebarExpanded(!isSidebarExpanded); // Function to toggle sidebar

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
      w={isSidebarExpanded || isSidebarPinned ? "72" : "20"} // Adjust width based on the sidebar status
      transition="width 0.9s ease-in-out"
      onMouseEnter={() => setIsSidebarExpanded(true)} // Expand on hover
      onMouseLeave={() => setIsSidebarExpanded(false)} // Collapse when mouse leaves
      borderRight={"1px solid #101828"}
      onClick={() => {
        if (!isSidebarPinned) {
          setIsSidebarExpanded(false);
        }
      }}
      onTouchMove={
        !isSidebarPinned
          ? () => {
              setIsSidebarExpanded(false);
            }
          : () => {}
      }
      onMouseMove={(event) => {
        if (event.clientX < 100) {
          setIsSidebarExpanded(true);
        }
      }}
      {...props}
    >
      <Stack
        as="nav"
        aria-label="Main Navigation"
        alignItems={
          isSidebarExpanded || isSidebarPinned ? "flex-start" : "center"
        }
      >
        <Box paddingY={"12px"} />
        <Flex
          direction={"row"}
          justifyContent={"space-between"}
          paddingX={"16px"}
          width={"100%"}
        >
          <Image src="/images/logo.svg" alt="Logo" height="40px" />
          {(isSidebarExpanded || isSidebarPinned) && (
            <IconButton
              aria-label="Pin Sidebar"
              icon={isSidebarPinned ? <TiPin /> : <TiPinOutline />}
              onClick={() => setIsSidebarPinned(!isSidebarPinned)}
              variant="ghost"
              size="sm"
              fontSize="20px"
              color="gray.300"
              bg="transparent"
              _hover={{
                bg: "transparent",
                color: "gray.300",
              }}
              alignSelf={"flex-start"}
              // top={"-24px"}
            />
          )}
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
            {(isSidebarExpanded || isSidebarPinned) && (
              <Text
                _groupHover={{
                  color: "gray.300",
                }}
              >
                {navItem.label}
              </Text>
            )}
          </NavItem>
        ))}
      </Stack>
    </Box>
  );

  return (
    <Box as="section" bg="brand.GRAY_900" height={"100%"}>
      <SidebarContent display={{ base: "none", md: "unset" }} />

      <Drawer
        isOpen={sidebarManager.isOpen}
        onClose={sidebarManager.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box
        ml={{ base: 0, md: isSidebarExpanded || isSidebarPinned ? 72 : 20 }}
        transition="0.1s ease"
        background={"#101828"}
        top="20px"
        zIndex="docked"
        position="relative"
        height={"100%"}
      >
        <Box
          as="main"
          p="8"
          borderTopLeftRadius={
            isSidebarExpanded || isSidebarPinned ? "40px" : "10px"
          }
          transition={"0.4s ease"}
          background={"white"}
          overflow={"hidden"}
          height={"100%"}
          position={"relative"}
          boxShadow={"0 0 20px 0 rgba(0,0,0,0.1)"}
          overflowY={"auto"}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
export default Dashboard;
