import { CloseButton, Flex, HStack } from "@chakra-ui/react";

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
      <Flex height={"100%"} direction={"column"} padding={4}>
        <AddTemplateSubSection
          label="Add exercise"
          onClick={() => addNewSubSectionToActiveTemplate(props.weekday)}
          size="xl"
        />
      </Flex>
    );
  }

  return (
    <Flex height={"100%"} direction={"column"} p={4}>
      {weekdaySection.subSections.length > 0 && (
        <AddTemplateSubSection
          label=""
          onClick={() => addNewSubSectionToActiveTemplate(props.weekday)}
        />
      )}
      {weekdaySection.subSections.length === 0 && (
        <AddTemplateSubSection
          label="Add exercise"
          size="lg"
          onClick={() => addNewSubSectionToActiveTemplate(props.weekday)}
        />
      )}
      {weekdaySection.subSections.map((subSection) => {
        return (
          <div key={subSection.id}>
            <ExerciseSubSection {...subSection} />
            <Flex direction={"column"}>weekday</Flex>
            <CloseButton
              className="close-button"
              size="md"
              position="absolute"
              display={"none"}
              top={"-10px"}
              right={"-20px"}
              background={"black"}
              color={"white"}
              borderRadius={"50%"}
              zIndex={100}
              onClick={() => {
                removeSubSectionFromActiveTemplate(
                  props.weekday,
                  subSection.id!
                );
              }}
              cursor={"pointer"}
            />
          </div>
        );
      })}
    </Flex>
  );
};

export const SECTION_WIDTH = 400;
