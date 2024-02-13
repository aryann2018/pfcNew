import { Button, Flex, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody, VStack } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { LuListFilter } from "react-icons/lu";
import React, { useState } from "react";

function ClientFilter() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <Flex gap={2}>
        <Button
          color="#F15C3D"
          bg="#FFEFEC"
          border="2px solid #FFEFEC"
          rightIcon={<AiOutlineClose />}
          colorScheme="#FFEFEC"
          variant="outline"
        >
          Active Members
        </Button>

        <Button
          color="Gray/700"
          bg="#fff"
          leftIcon={<LuListFilter />}
          colorScheme="#FFEFEC"
          variant="outline"
          onClick={toggleDrawer}
        >
          More Filters
        </Button>
      </Flex>
      <Drawer placement="right" onClose={toggleDrawer} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Filters</DrawerHeader>
            <DrawerBody>
              {/* Add your filter options here */}
              <VStack spacing={4}>
                {/* Filter options */}
                <Button>Active Members 1</Button>
                <Button>Active Members 2</Button>
                <Button>Active Members 3</Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
}

export default ClientFilter;