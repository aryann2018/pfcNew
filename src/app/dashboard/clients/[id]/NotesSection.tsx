import { Box, Divider, Flex, Text } from "@chakra-ui/react";
import { CgNotes } from "react-icons/cg";

export const NotesSection = (props: any) => {
  return (
    //Coming Soon Fixed Banner

    <Flex direction="column">
      <Flex direction={"row"} alignItems={"center"}>
        <CgNotes size={20} />
        <Box p={1} />
        <Text>Notes</Text>
      </Flex>
      <Box p={1} />
      <Divider />
      <Box p={2} fontSize={"sm"}>
        <strong className="font-bold">Coming Soon!</strong>
        <span className="block sm:inline">
          {" "}
          This feature is still in development. Please check back later.
        </span>
      </Box>
    </Flex>
  );
};
