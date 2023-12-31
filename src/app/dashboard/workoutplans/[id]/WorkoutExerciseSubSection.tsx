import { useEffect, useState } from "react";
import { PFCColors } from "@/app/common/PFCColors";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FiPlusCircle } from "react-icons/fi";
import { ExerciseType } from "../api/types";
import useWorkoutPlanStore from "./useWorkoutplansStore";
import SearchableExerciseSelect from "@/app/common/inputs/SearchableExerciseSelect";
import { MetaInputs } from "./MetaInputs";

interface AddTemplateSubSectionProps {
  label: string;
  onClick: () => void;
  size?: "sm" | "md" | "lg" | "xl";
}

export const AddTemplateSubSection = ({
  label,
  onClick,
  ...props
}: AddTemplateSubSectionProps) => {
  return (
    <Flex
      direction={"column"}
      onClick={onClick}
      cursor={"pointer"}
      alignItems={"center"}
      justifyContent={"center"}
      bg="#EAECF0"
      p={props.size === "xl" ? "24px" : props.size === "lg" ? "16px" : "10px"}
      borderRadius={"4px"}
    >
      <FiPlusCircle size={24} color="rgba(102, 112, 133, 1)" />
      <Text fontSize={"15px"} color={"rgba(71, 84, 103, 1)"} fontWeight={500}>
        {label}
      </Text>
    </Flex>
  );
};

export interface TemplateSubSection {
  id: string;
  workoutId?: string;
  name: string;
  description: string;
  isNew?: boolean;
  exercise?: ExerciseType;
  sets: number;
  reps: number;
  rest: number;
  style?: any;
  notes?: string;
  preffered_day_of_week: string;
}

const MuscleTargetedLabel = ({ label }: { label: string }) => {
  return (
    <Flex
      bg={"#D0D5DD"}
      paddingY={1.5}
      paddingX={2}
      borderRadius={"4px"}
      alignItems={"center"}
      justifyContent={"center"}
      width={"fit-content"}
    >
      <Text
        fontSize={"12px"}
        fontFamily={"JetBrains Mono"}
        color={"#344054"}
        fontWeight={600}
      >
        {label}
      </Text>
    </Flex>
  );
};

export const ExerciseSubSection = (props: TemplateSubSection) => {
  console.log(props);
  const [selected, setSelected] = useState<ExerciseType | undefined>();

  const { setSubSectionInSection, updateSubSectionSets, updateSubSectionReps } =
    useWorkoutPlanStore();

  useEffect(() => {
    console.log(selected);
    if (selected) {
      const newSubSection = {
        id: selected.id!,
        exercise: selected,
        name: selected.name,
        description: selected.description,
        preffered_day_of_week: props.preffered_day_of_week,
        sets: 1,
        reps: 1,
        rest: 0,
        muscle_targeted: selected.muscle_targeted,
      };

      setSubSectionInSection(
        props.preffered_day_of_week,
        props.id!,
        newSubSection
      );
      setSelected(undefined);
    }
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex
      direction={"column"}
      justifyContent={"space-between"}
      bg={"#F9FAFB"}
      p={3}
      borderRadius={"4px"}
      zIndex={props.style?.zIndex}
      gap={"10px"}
      width={"100%"}
      border={"1px solid #D0D5DD"}
    >
      <MuscleTargetedLabel
        label={props.exercise?.muscle_targeted || "unknown"}
      />
      <SearchableExerciseSelect
        isLoadingOptions={false}
        selected={props.exercise}
        onSelect={(value) => {
          console.log(value);
          setSelected(value);
        }}
      />
      <Text fontSize={"12px"}>{props.description}</Text>
      <MetaInputs
        sets={props.sets}
        onSetsChange={(value) => {
          updateSubSectionSets(props.preffered_day_of_week, props.id!, value);
        }}
        reps={props.reps}
        onRepsChange={(value) => {
          updateSubSectionReps(props.preffered_day_of_week, props.id!, value);
        }}
        rest={props.rest}
        onRestChange={() => {}}
      />
    </Flex>
  );
};
