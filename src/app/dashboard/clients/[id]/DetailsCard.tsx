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
  width?: string;
};

const SingleDetail = ({
  label,
  value,
  isCopyable,
  width,
}: singleDetailProps) => {
  return (
    <Flex direction={"row"} width={width ?? "100%"} fontWeight={"400"}>
      <Flex direction="column">
        <Text fontSize={12} color={"#475467"}>
          {label}:{" "}
        </Text>{" "}
        <Text fontSize={14}>
          {value ?? "-"}
          {"  "}
          {isCopyable && (
            <IconButton
              bg={"transparent"}
              aria-label="copy"
              size={"xs"}
              icon={<MdOutlineContentCopy />}
              onClick={() => {
                navigator.clipboard.writeText(value as string);
              }}
            />
          )}
        </Text>
      </Flex>
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

const contactDetails = (client: SubscriptionType["client"]) => {
  return {
    contact: client.phone_number,
    // email: client.email ?? "-",
  };
};

// const physicalDetails = (client: SubscriptionType["client"]) => {
//   return {
//     weight: client.weight_in_gm,
//     height: client.height_in_cm,
//     BMI: client.bmi,
//   };
// };

// const addressDetails = (client: SubscriptionType["client"]) => {
//   return {
//     address:
//       client.line_address +
//       ", " +
//       client.city +
//       ", " +
//       client.state +
//       ", " +
//       client.country,
//   };
// }

// const subscriptionDetails = (sub: SubscriptionType["subscription_plan"]) => {
//   return {
//     coach_type: sub,
//     subscription: sub.type,
//     start_date: client.subscription_start_date,
//     end_date: client.subscription_end_date,
//   };
// }

export const DetailsCard = ({ id }: { id: string }) => {
  const { data, error, isLoading } = useGetSubscriptions();

  const subscriptions = data?.data;

  const client = useMemo(
    () =>
      subscriptions?.find((subscription) => subscription.client.id === id)
        ?.client,
    [id, subscriptions]
  );

  client;
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
    <>
      <Flex
        direction={"row"}
        width={"48%"}
        wrap={"wrap"}
        p="4"
        border="1px solid #EAECF0"
        borderRadius={"8px"}
        gap={"16px"}
      >
        <SingleDetail
          label={"Phone Number"}
          value={client.phone_number}
          isCopyable={true}
        />
        <SingleDetail
          label={"Email"}
          value={"client.email"}
          isCopyable={true}
        />
      </Flex>
      <Flex
        direction={"row"}
        width={"48%"}
        wrap={"wrap"}
        p="4"
        border="1px solid #EAECF0"
        borderRadius={"8px"}
        gap={"16px"}
      >
        <SingleDetail label={"Dietary Preference"} value={"Veg"} />
        <SingleDetail label={"Allergies"} value={client.allergies ?? "-"} />
      </Flex>
      <Flex
        direction={"row"}
        width={"48%"}
        wrap={"wrap"}
        p="4"
        border="1px solid #EAECF0"
        borderRadius={"8px"}
        gap={"8px"}
      >
        <SingleDetail label={"Plan"} value={client.phone_number} width="48%" />
        <SingleDetail label={"Plan Start"} value={"Executive"} width="48%" />
        <SingleDetail label={"Plan Type"} value={"Individual"} width="48%" />
        <SingleDetail label={"Plan End"} value={"04 Feb"} width="48%" />
      </Flex>

      <Flex
        direction={"row"}
        width={"48%"}
        wrap={"wrap"}
        p="4"
        border="1px solid #EAECF0"
        borderRadius={"8px"}
        gap={"8px"}
      >
        <SingleDetail label={"Height"} value="167 cm" width="48%" />
        <SingleDetail label={"Weight"} value={"64 kg"} width="48%" />
        <SingleDetail label={"Age"} value={"31"} width="48%" />
        <SingleDetail label={"TDEE"} value={"18.32"} width="48%" />
      </Flex>
    </>
  );
};
