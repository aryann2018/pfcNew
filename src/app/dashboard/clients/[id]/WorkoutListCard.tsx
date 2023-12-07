"use client";

import {
  Box,
  Divider,
  Flex,
  HStack,
  IconButton,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { CiCirclePlus } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { useGetWorkoutPlans } from "../../workoutplans/api/hooks";
import { WorkoutPlanType } from "../../workoutplans/api/types";

const WorkoutPlanListCard = ({ id, name, onClick }: any) => {
  return (
    <Flex
      direction={"column"}
      padding={"4"}
      cursor={"pointer"}
      onClick={onClick}
    >
      <Text color="#101828" fontWeight="500">
        {name}
      </Text>
      <Box p={2} />
      <Divider />
    </Flex>
  );
};

interface WorkoutPlanListProps {
  clientId: string;
}

export const WorkoutPlanList = (props: WorkoutPlanListProps) => {
  const { data, error, isLoading } = useGetWorkoutPlans({
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
      height={"100%"}
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
          Workout Plans
        </Text>
        <Spacer />
        <Box>
          <IconButton
            onClick={() =>
              router.push(
                `/dashboard/workoutplans/new?client_id=${props.clientId}`
              )
            }
            aria-label="add workout plan"
            icon={<CiCirclePlus />}
          />
        </Box>
      </HStack>
      {data.data.map((plan: WorkoutPlanType) => (
        <WorkoutPlanListCard
          key={plan.id}
          id={plan.id}
          name={plan.name}
          onClick={() => {
            router.push(
              `/dashboard/workoutplans/${plan.id}?client_id=${props.clientId}`
            );
          }}
        />
      ))}
    </Box>
  );
};
