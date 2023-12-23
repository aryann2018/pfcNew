import { Box, Divider, Flex, HStack, Spacer } from "@chakra-ui/react";
import { DetailsCard } from "./DetailsCard";
import { DietList } from "./DietList";
import { DetailsHeader } from "./DetailHeader";
import { WorkoutPlanList } from "./WorkoutListCard";
import { NotesSection } from "./NotesSection";
import PFCSpace from "@/app/common/PFCSpace";

interface MainProps {
  id: string;
}

export const Main = (props: MainProps) => {
  return (
    <Flex direction={"column"} width={"100%"}>
      <DetailsHeader id={props.id} />
      <PFCSpace />
      <HStack
        width={"100%"}
        alignItems={"flex-start"}
        padding={"24px"}
        border={"1px solid #EAECF0"}
        boxShadow={"0px 1px 2px 0px #1018280F"}
        borderRadius={"8px"}
      >
        <HStack
          alignItems={"flex-start"}
          width={"62%"}
          wrap={"wrap"}
          gap={"20px"}
        >
          <DetailsCard id={props.id} />
          <DietList clientId={props.id} />
          <WorkoutPlanList clientId={props.id} />
        </HStack>
        <Spacer />
        <NotesSection />
      </HStack>
    </Flex>
  );
};
