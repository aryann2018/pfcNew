"use client";

import { Box, Divider, Flex, IconButton, Text } from "@chakra-ui/react";
import { useGetSubscriptions } from "../api/hooks";
import { useMemo } from "react";
import { SubscriptionType } from "../api/types";
import { MdOutlineContentCopy } from "react-icons/md";

type singleDetailProps = {
  label: string;
  value: string | number;
  isCopyable?: boolean;
};

const SingleDetail = ({ label, value, isCopyable }: singleDetailProps) => {
  return (
    <Flex direction={"row"} width={"100%"}>
      <Text fontSize="smaller">{label}: </Text>{" "}
      <Text fontWeight={"bold"} fontSize="smaller">
        {value ?? "-"}
      </Text>
      {isCopyable && (
        <IconButton
          aria-label="copy"
          size={"xs"}
          icon={<MdOutlineContentCopy />}
          onClick={() => {
            navigator.clipboard.writeText(value as string);
          }}
        />
      )}
    </Flex>
  );
};

const getAllDetails = (client: SubscriptionType["client"]) => {
  return {
    BMI: client.bmi,
    contact: client.phone_number,
    weight: client.weight_in_gm,
    height: client.height_in_cm,
    address:
      client.line_address +
      ", " +
      client.city +
      ", " +
      client.state +
      ", " +
      client.country,
    gender: client.sex,
    age: client.age,
  };
};

export const DetailsCard = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useGetSubscriptions();

  const subscriptions = data?.data;

  const client = useMemo(
    () =>
      subscriptions?.find((subscription) => subscription.client.id === id)
        ?.client,
    [id, subscriptions]
  );

  console.log(client);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data) {
    return <div>No data</div>;
  }
  if (!client) {
    return <div>No client</div>;
  }

  return (
    <Flex direction={"row"} alignItems={"flex-start"}>
      {Object.entries(getAllDetails(client)).map(([key, value]) => (
        <SingleDetail key={key} label={key} value={value} isCopyable={true} />
      ))}
    </Flex>
  );
};
