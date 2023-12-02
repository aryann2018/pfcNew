"use client";
import { useRouter } from "next/navigation";
import SubscriptionList from "./ClientList";
import { Flex } from "@chakra-ui/react";

const Clients = ({ ...props }) => {
  const router = useRouter();

  return (
    <Flex justifyContent={"center"} height="100%">
      <SubscriptionList />
    </Flex>
  );
};

export default Clients;
