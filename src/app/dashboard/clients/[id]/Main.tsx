import { Box, Divider, HStack, Spacer } from "@chakra-ui/react";
import { DetailsCard } from "./DetailsCard";
import { DietList } from "./DietList";
import { DetailsHeader } from "./DetailHeader";
import { WorkoutPlanList } from "./WorkoutListCard";
import { NotesSection } from "./NotesSection";

interface MainProps {
  id: string;
}

export const Main = (props: MainProps) => {
  return (
    <>
      <DetailsHeader id={props.id} />
      <Box height={"20px"} />
      <Divider />
      <Box height={"20px"} />

      <DetailsCard id={props.id} />
      <Box height={"20px"} />
      <HStack width={"100%"} alignItems={"flex-start"}>
        <HStack
          alignItems={"flex-start"}
          width={"100%"}
          minHeight={"300px"}
          maxHeight={"300px"}
        >
          <DietList clientId={props.id} />

          <WorkoutPlanList clientId={props.id} />
        </HStack>
        <Spacer />
        <NotesSection />
      </HStack>
    </>
  );
};
