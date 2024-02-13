import React, { useState } from "react";
import { TableContainer, Table, Input, Thead, Heading, Tr, Th, Td, Flex, Text, Button, Collapse } from "@chakra-ui/react";
import { IoIosArrowDown,IoIosArrowUp } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";
import { HiMiniArrowLongDown } from "react-icons/hi2";

function AccordionTable() {
  const [openRows, setOpenRows] = useState({}); // State to track open rows

  const rows = [
    { id: 1, content: "Content for 1" },
    { id: 2, content: "Content for 2" },
    { id: 3, content: "Content for 3" },
    { id: 4, content: "Content for 4" },
    { id: 5, content: "Content for 5" },
    // ... more rows
  ];

  // Function to toggle row expansion
  const toggleRow = (id) => {
    setOpenRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <TableContainer borderWidth="1px" borderRadius="lg" overflow="hidden" width={"100%"}>
      <Table size="lg">
        {/* Thead-like Header */}
        <Thead>
          <Tr justifyContent="space-around" p={2}>
            <Th w="180" maxW={180}>
              <Text fontSize="xs" color="grey200" textTransform="capitalize">Next Call</Text>
            </Th>
            <Th>
              <Text fontSize="xs" color="grey200" textTransform="capitalize">Client Name(7)</Text>
            </Th>
            <Th>
              <Text fontSize="xs" color="grey200" textTransform="capitalize">Expiry</Text>
            </Th>
            <Th colSpan={3}>
              <Text fontSize="xs" color="grey200" textTransform="capitalize">Last 1 week change</Text>
            </Th>
          </Tr>
        </Thead>

        
        <tbody>
        {rows.map((row, index) => (
            <React.Fragment key={row.id}>
              <Tr onClick={() => toggleRow(row.id)} cursor="pointer" 
                bg={openRows[row.id] ? "#eaecf0" : (index % 2 === 0 ? "#fff" : "#F9FAFB")}  p={2}>
                <Td>Today<br/>
                <Flex alignItems="center">
                  <Input
                    w='60px'
                    variant="unstyled"
                    fontSize="xs"
                    defaultValue="24-02-23"
                    onChange={(event) => console.log(event.target.value)}
                    marginRight="0"
                  />
                  <AiOutlineEdit />
                </Flex>
                </Td>
                <Td><Text as='b' fontSize='md'>
                  <span style={{ textDecoration: 'underline' }}>Jitesh Luthra</span></Text><br/>
                  <span>+91 9090990909</span>
                </Td>
                <Td>in 24 days<br/>
                  <span>4-week Plan</span>
                </Td>
                <Td><Text>Weight</Text>
                <Text display="flex" alignItems="center">
                  2.5kg (<span>
                    <HiMiniArrowLongDown />
                  </span>)
                </Text>


                </Td>
                <Td>BMI<br/>
                  <Text display="flex" alignItems="center">
                  0.28 (<span>
                      <HiMiniArrowLongDown />
                    </span>)
                  </Text>
                </Td>
                <Td>
                <Button size="md" bg="transparent">{openRows[row.id] ? <IoIosArrowDown /> : <IoIosArrowUp />}</Button>

                </Td>
              </Tr>
              {openRows[row.id] && (
               <Tr bg="#F2F4F7" color="#475467" border="1px solid #EAECF0">
                  <Td w="180">
                    <Text fontSize='xs'>Gender</Text>
                    <Text>Male</Text>
                    <Text fontSize='xs' pt="4">Age</Text>
                    <Text>31</Text>
                  </Td>
                  <Td>
                    <Text fontSize='xs'>Height</Text>
                    <Text>167 cm</Text>
                    <Text fontSize='xs' pt="4">Weight</Text>
                    <Text>64 kg (from 68 in 3mo)</Text>
                  </Td>
                  <Td colSpan={2}>
                    <Text fontSize='xs'>Goal</Text>
                    <Text>Lose weight & gain muscle</Text>
                    <Text fontSize='xs' pt="4">Preference & Allergies</Text>
                    <Text>Veg. List the allergies here ......</Text>
                  </Td>
                  <Td colSpan={2}>
                    <Text fontSize='xs'>Diet Plan</Text>
                    <Text>Last Assigned 24-09</Text>
                    <Text fontSize='xs' pt="4">Workout Plan</Text>
                    <Text>Last Assigned 24-09</Text>
                  </Td>
                </Tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>
    </TableContainer>
  );
}

export default AccordionTable;
