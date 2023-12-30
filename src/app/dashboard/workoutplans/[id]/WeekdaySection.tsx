import { Flex, HStack } from "@chakra-ui/react";

import {
  AddTemplateSubSection,
  TemplateSubSection,
  ExerciseSubSection,
} from "./WorkoutExerciseSubSection";
import useWorkoutplanStore from "./useWorkoutplansStore";

export interface TemplateSection {
  id: string;
  name: string;
  description: string;
  subSections: TemplateSubSection[];
  preffered_day_of_week: string;
}

interface TemplateSectionProps extends TemplateSection {}

interface WeekdaySectionProps {
  weekday: string;
}

export const WeekdaySection = (props: WeekdaySectionProps) => {
  const {
    addNewSubSectionToActiveTemplate,
    removeSubSectionFromActiveTemplate,
    activeTemplate,
  } = useWorkoutplanStore();

  const weekdaySection = activeTemplate?.sections.find(
    (section) => section.preffered_day_of_week === props.weekday
  );

  if (!weekdaySection) {
    return (
      <Flex height={"100%"}>
        <AddTemplateSubSection
          label="Add exercise"
          onClick={() => addNewSubSectionToActiveTemplate(props.weekday)}
        />
        <Flex direction={"column"}>weekday</Flex>
      </Flex>
    );
  }

  return (
    <Flex height={"100%"}>
      <AddTemplateSubSection
        label="Add exercise"
        onClick={() => addNewSubSectionToActiveTemplate(props.weekday)}
      />
      <Flex direction={"column"}>weekday</Flex>
      {weekdaySection.subSections.map((subSection) => {
        return (
          <div key={subSection.id}>
            <ExerciseSubSection {...subSection} />
            <Flex direction={"column"}>weekday</Flex>
          </div>
        );
      })}
    </Flex>
  );
};

export const SECTION_WIDTH = 330;
