import SubscriptionList from "./ClientList";
import { Flex } from "@chakra-ui/react";

export default function Clients() {
  return (
    <Flex justifyContent={"center"} height="100%">
      <SubscriptionList />
    </Flex>
  );
}
