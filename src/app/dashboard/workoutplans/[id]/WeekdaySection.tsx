import { Flex, HStack } from "@chakra-ui/react";

import {
  AddTemplateSubSection,
  ExerciseSubSection,
  TemplateSubSection,
} from "./WorkoutExerciseSubSection";
import EditableText from "@/app/common/inputs/EditableInput";
import useWorkoutplanStore from "./useWorkoutplansStore";

export interface TemplateSection {
  id: string;
  name: string;
  description: string;
  subSections: TemplateSubSection[];
  preffered_day_of_week: string;
}

interface TemplateSectionProps extends TemplateSection {}

export const WeekdaySection = (props: TemplateSectionProps) => {
  const {
    addNewSubSectionToActiveTemplate,
    removeSubSectionFromActiveTemplate,
  } = useWorkoutplanStore();

  return (
    <div>
      <AddTemplateSubSection
        label="Add exercise"
        onClick={() => addNewSubSectionToActiveTemplate(props.id)}
      />
      <Flex direction={"column"}>weekday</Flex>
    </div>
  );
};
