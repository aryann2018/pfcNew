"use client";
import { PFCColors } from "@/app/common/PFCColors";
import {
  Table,
  Thead,
  ButtonGroup,
  Button,
  Tbody,
  Input,
  InputLeftElement,
  Tfoot,
  Tr,
  InputGroup,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Flex,
  Spacer,
  HStack,
  SkeletonText,
  CircularProgress,
  Box,
} from "@chakra-ui/react";
import { getDaysUntilEndDate } from "@/app/utilities/utils";
import { FiUploadCloud } from "react-icons/fi";
import { BsFilter } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";

import { ClientType, SubscriptionType } from "./api/types";
import { useRouter } from "next/navigation";
import { useGetSubscriptions } from "./api/hooks";
//import  useQueryCoachProfile  from "./api/hooks";
import PFCSpace from "@/app/common/PFCSpace";
import SearchBox from "./SearchBox";
import AccordionTable from "./ClientsTable";
import ClientFilter from "./ClientFilter";
//import useQueryCoachProfile from ""

interface ClientSubscriptionProps {
  subscription: SubscriptionType;
}

interface ClientDetailsProps {
  client: ClientType;
  endDate: string;
  subscriptionType: String;
}

const ClientDetails = (props: ClientDetailsProps) => {
  const { client, endDate, subscriptionType } = props;

  const router = useRouter();

  if (endDate < new Date().toISOString()) {
    return (
      <Tr
        width={"100%"}
        paddingY={"16px"}
        paddingX={"24px"}
        background={"red.300"}
        onClick={() => router.push(`/dashboard/clients/${client.id}`)}
      >
        <Td>
          <div>
            <Text fontWeight="bold" decoration={"underline"}>
              {client.first_name + " " + client.middle_name}
            </Text>
            <Text fontSize="sm">{client.phone_number}</Text>
          </div>
        </Td>
        <Td>
          <Flex direction={"column"} width={"100%"}>
            <Flex direction={"row"}>
              <Text fontSize="smaller">Plan: </Text>{" "}
              <Text fontWeight={"bold"} fontSize="smaller">
                {subscriptionType}
              </Text>
            </Flex>
            <Spacer />
            <Flex direction={"row"}>
              <Text fontSize="smaller">Ended on: </Text>{" "}
              <Text fontWeight={"bold"} fontSize="smaller">
                {getDaysUntilEndDate(endDate)}
              </Text>
            </Flex>
          </Flex>
        </Td>
        <Td></Td>
      </Tr>
    );
  }
  return (
    <Tr
      _hover={{ cursor: "pointer", background: PFCColors.GRAY_100 }}
      onClick={() => router.push(`/dashboard/clients/${client.id}`)}
      width={"100%"}
      paddingY={"16px"}
      paddingX={"24px"}
    >
      <Td>
        <div>
          <Text fontWeight="bold" decoration={"underline"}>
            {client.first_name + " " + client.middle_name}
          </Text>
          <Box p={"4px"}></Box>
          <Text fontSize="sm">{client.phone_number}</Text>
        </div>
      </Td>
      <Td>
        <Flex direction={"column"} width={"100%"}>
          <Flex direction={"row"}>
            <Text fontSize="smaller">Plan: </Text>
            <Box width={"4px"}></Box>
            <Text fontWeight={"bold"} fontSize="smaller">
              {subscriptionType}
            </Text>
          </Flex>
          <Box p={"4px"}></Box>
          <Flex direction={"row"}>
            <Text fontSize="smaller">Ends in: </Text>
            <Box width={"4px"}></Box>
            <Text fontWeight={"bold"} fontSize="smaller">
              {getDaysUntilEndDate(endDate)}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td justifyContent={"space-between"}>
        <Flex direction={"column"} width={"100%"}>
          <Spacer />
          <Flex direction={"row"}>
            <Text fontSize="smaller">BMI: </Text>
            <Box width={"4px"}></Box>
            <Text fontWeight={"bold"} fontSize="smaller">
              {client.bmi}
            </Text>
          </Flex>
          <Spacer />
          <Flex direction={"row"}>
            <Text fontSize={"smaller"}>Weight: </Text>
            <Box width={"4px"}></Box>
            <Text fontWeight={"bold"} fontSize="smaller">
              {client.weight_in_gm / 1000} kg
            </Text>
          </Flex>
          <Spacer />
          <Flex direction={"row"}>
            <Text fontSize={"smaller"}>Height: </Text>
            <Box width={"4px"}></Box>
            <Text fontWeight={"bold"} fontSize="smaller">
              {client.height_in_cm} cm
            </Text>
          </Flex>
          <Spacer />
        </Flex>
      </Td>
    </Tr>
  );
};

const ClientSubscription = (props: ClientSubscriptionProps) => {
  const { subscription } = props;
  const { clients, end_date, type } = subscription;

  const router = useRouter();

  return (
    <>
      {clients && clients.length > 0 ? (
        clients.map((client) => {
          return (
            <ClientDetails
              key={client.id}
              client={client}
              endDate={end_date}
              subscriptionType={type}
            />
          );
        })
      ) : (
        <Text fontSize={"smaller"} textAlign={"center"}>
          No clients
        </Text>
      )}
    </>
  );
};

const SubscriptionList = () => {
  const { isLoading, data, isError } = useGetSubscriptions();
  const subscriptions = data?.data;

  if (isLoading) {
    return <CircularProgress color={PFCColors.PRIMARY_400} isIndeterminate />;
  }

  if (isError) {
    return <Text>Something went wrong</Text>;
  }

  if (!subscriptions || subscriptions.length === 0) {
    <Flex>
      <HStack>
        <Box bg="#FFEFEC">No Subscriptions to view</Box>
      </HStack>
    </Flex>;
  }

  return (
    <Box width={"100%"} height={"100%"}>
      <Flex minWidth='max-content' alignItems='center' gap='2' mb='4'>
       <Box>
          <Text fontSize={"30px"} fontWeight={"bold"}>
            Welcome back, Satej
          </Text>
          <Text>Track and manage your clients.</Text>
        </Box>
        <Spacer />
        <ButtonGroup gap='2'>
        <Button leftIcon={<FiUploadCloud />} colorScheme="" variant="outline">
            Import
          </Button>
        </ButtonGroup>
      </Flex>
      
      <Flex gap="2">
        <Box>
          <SearchBox></SearchBox>
        </Box>
        <Box>
          <ClientFilter></ClientFilter>
        </Box>
      </Flex>
      <PFCSpace />
      <AccordionTable></AccordionTable>

      <TableContainer
        borderRadius={"8px"}
        border="1px solid #EAECF0"
        box-shadow="0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)"
        width={"100%"}
        display="none"
      >
        <Table variant="stripped" colorScheme={"Red"} position={"relative"}>
          <TableCaption
            position={"sticky"}
            bottom={0}
            background={PFCColors.WHITE}
            fontSize={"smaller"}
          >
            {subscriptions!.length} clients
          </TableCaption>
          <Thead
            position={"sticky"}
            top={0}
            background={PFCColors.WHITE}
            borderBottom={"1px solid rgba(234, 236, 240, 1)"}
          >
            <Tr>
              <Th color={"#667085"}>Client details</Th>
              <Th color="#667085">Plan details</Th>
              <Th color={"#667085"}>
                <Text align={"left"}>BMI details</Text>
              </Th>
            </Tr>
          </Thead>

          <Tbody>
            {subscriptions!.map((subscription) => {
              return (
                <ClientSubscription
                  key={subscription.id}
                  subscription={subscription}
                />
              );
            })}
          </Tbody>

          <Tfoot>
            <Tr>
              <Th color={"#667085"}>Client detailss </Th>
              <Th color="#667085">Plan details</Th>
              <Th color={"#667085"}>
                <Text align={"left"}>BMI details</Text>
              </Th>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default SubscriptionList;
