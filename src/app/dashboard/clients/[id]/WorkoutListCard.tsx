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

const WorkoutPlanListCard = ({ desc, name, onClick }: any) => {
  return (
    <Flex
      direction={"column"}
      padding={"10px"}
      onClick={onClick}
      cursor={"pointer"}
    >
      <Flex direction={"column"}>
        <Text color="#101828" fontWeight="500" fontSize={"14px"}>
          {name}
        </Text>
        <Box p="0.5" />
      </Flex>
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

  data;
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
      width={"48%"}
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
            bg="transparent"
            aria-label="add workout plan"
            icon={<CiCirclePlus />}
          />
        </Box>
      </HStack>
      {data.data.map((plan: WorkoutPlanType) => (
        <WorkoutPlanListCard
          key={plan.id}
          name={plan.name}
          desc={`8 Workouts`}
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
