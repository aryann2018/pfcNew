"use client";

import {
  Text,
  Box,
  Spacer,
  Flex,
  HStack,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { CiCirclePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";

import { useGetDietPlans } from "../../dietplans/api/hooks";
import { DietPlan } from "../../dietplans/api/types";

const DietListCard = ({ id, name, onClick }: any) => {
  return (
    <Flex
      direction={"column"}
      padding={"4"}
      onClick={onClick}
      cursor={"pointer"}
    >
      <Text color="#101828" fontWeight="500">
        {name}
      </Text>
      <Box p={2} />
      <Divider />
    </Flex>
  );
};

interface DietListrops {
  clientId: string;
}

export const DietList = (props: DietListrops) => {
  const { data, error, isLoading } = useGetDietPlans({
    client_id: props.clientId,
  });

  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <Box
      width={"100%"}
      borderRadius="8px"
      border="1px solid #EAECF0"
      minHeight={"300px"}
      maxHeight={"600px"}
    >
      <HStack padding="10px">
        <Text
          color="#475467"
          fontSize="12px"
          fontStyle="normal"
          fontWeight="400"
        >
          Diet Plans
        </Text>
        <Spacer />
        <Box>
          <IconButton
            onClick={() =>
              router.push(
                `/dashboard/dietplans/new?client_id=${props.clientId}`
              )
            }
            aria-label="add workout plan"
            icon={<CiCirclePlus />}
          />
        </Box>
      </HStack>
      {data.data.map((dietPlan: DietPlan) => (
        <DietListCard
          key={dietPlan.id}
          id={dietPlan.id}
          name={dietPlan.name}
          onClick={() => {
            router.push(
              `/dashboard/dietplans/${dietPlan.id}?client_id=${props.clientId}`
            );
          }}
        />
      ))}
    </Box>
  );
};
