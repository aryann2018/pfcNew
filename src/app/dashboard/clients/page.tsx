"use client";
import SubscriptionList from "./ClientList";
import { Flex } from "@chakra-ui/react";
import ClientsTable from "./ClientsTable";

export default function Clients() {
  return (
    <Flex justifyContent={"center"} height="100%" p={8}>
      <SubscriptionList />
      {/* <ClientsTable /> */}
    </Flex>
  );
}
