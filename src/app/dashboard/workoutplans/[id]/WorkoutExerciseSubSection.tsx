import { useEffect, useState } from "react";
import { PFCColors } from "@/app/common/PFCColors";
import { Flex, Text } from "@chakra-ui/react";
import { FiPlusCircle } from "react-icons/fi";
import { ExerciseType } from "../api/types";
import useWorkoutPlanStore from "./useWorkoutplansStore";

interface AddTemplateSubSectionProps {
  label: string;
  onClick: () => void;
}

export const AddTemplateSubSection = ({
  label,
  onClick,
}: AddTemplateSubSectionProps) => {
  return (
    <Flex
      direction={"column"}
      onClick={onClick}
      cursor={"pointer"}
      alignItems={"center"}
      justifyContent={"center"}
      bg="white"
      p="10px"
      borderRadius={"4px"}
      boxShadow="0px 1.69px 1.69px 0px rgba(24, 34, 48, 0.10)"
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
}

export const ExerciseSubSection = (props: TemplateSubSection) => {
  const [selected, setSelected] = useState<ExerciseType | undefined>();

  const { setSubSectionInSection } = useWorkoutPlanStore();

  useEffect(() => {
    if (selected) {
      const newSubSection = {
        id: selected.id!,
        exercise: selected,
        name: selected.name,
        description: selected.description,
        sets: 1,
        reps: 1,
        rest: 0,
      };

      setSubSectionInSection(props.id!, props.id!, newSubSection);
      setSelected(undefined);
    }
  }, [selected]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Flex
      direction={"row"}
      justifyContent={"space-between"}
      bg={PFCColors.WHITE}
      p="12px"
      borderRadius={"4px"}
      boxShadow="0px 1.69px 1.69px 0px rgba(24, 34, 48, 0.10)"
      zIndex={props.style?.zIndex}
      gap={"10px"}
    >
      sub section
    </Flex>
  );
};
