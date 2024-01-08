import React, { useState } from "react";
import { Box, Flex, Text, Button, Collapse } from "@chakra-ui/react";

function AccordionTable() {
  const [openRows, setOpenRows] = useState<any>({}); // State to track open rows

  const rows = [
    { id: 1, content: "Content for 1" },
    { id: 2, content: "Content for 2" },
    // ... more rows
  ];

  // Function to toggle row expansion
  const toggleRow = (id: any) => {
    setOpenRows((prev: any) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      width={"100%"}
    >
      {/* Thead-like Header */}
      <Flex justifyContent="space-around" bg="gray.200" p={2}>
        <Text fontWeight="bold">ID</Text>
        <Text fontWeight="bold">Action</Text>
      </Flex>
      {rows.map((row) => (
        <Box key={row.id} borderBottomWidth="1px">
          <Flex
            justifyContent="space-around"
            onClick={() => toggleRow(row.id)}
            cursor="pointer"
            p={2}
          >
            <Text>Item {row.id}</Text>
            <Button size="sm">{openRows[row.id] ? "Less" : "More"}</Button>
          </Flex>
          <Collapse in={openRows[row.id]}>
            <Box p={4} color="gray.600">
              {row.content}
            </Box>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
}

export default AccordionTable;
