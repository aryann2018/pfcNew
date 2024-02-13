//import React, { useState } from 'react';
import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { CgNotes } from "react-icons/cg";
import NoteLists from "./NoteLists";
export const NotesSection = (props: any) => {
  return (
    //Coming Soon Fixed Banner

    <Flex direction="column" borderLeft="1px solid #EAECF0" padding={6}>
      <Flex direction={"row"} alignItems={"center"} mb={2}>
        
        <Text mb={4}>Notes</Text>
      </Flex>
      <NoteLists></NoteLists>
      <Box p={0} />
      <Divider />
      <Box p={2} fontSize={"sm"}>
        <Flex display="none">
          <strong className="font-bold">Coming Soon!</strong><br/>
          <span className="block sm:inline">
            {" "}
            This feature is still in development. Please check back later.
          </span>
        </Flex>
        
      </Box>
      
    </Flex>
  );
};
