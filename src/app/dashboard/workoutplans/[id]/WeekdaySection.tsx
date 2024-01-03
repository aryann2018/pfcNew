import { Box, CloseButton, Flex, HStack, Stack, Text } from "@chakra-ui/react";

import {
  AddTemplateSubSection,
  TemplateSubSection,
  ExerciseSubSection,
} from "./WorkoutExerciseSubSection";
import useWorkoutplanStore from "./useWorkoutplansStore";
import { FaBed, FaTrash } from "react-icons/fa";

export interface TemplateSection {
  id: string;
  name: string;
  description: string;
  subSections: TemplateSubSection[];
  preffered_day_of_week: string;
  is_marked_rest_day?: boolean;
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
    setIsMarkedRestDay,
  } = useWorkoutplanStore();
  const weekdaySection = activeTemplate?.sections.find(
    (section) =>
      section.preffered_day_of_week.toLowerCase() ===
      props.weekday.toLowerCase()
  );

  if (!weekdaySection) {
    return (
      <Stack p={4}>
        <AddTemplateSubSection
          label="Add exercise"
          size="lg"
          onClick={() => addNewSubSectionToActiveTemplate(props.weekday)}
        />
        <Text fontSize="sm" color="gray.500" align={"center"}>
          or
        </Text>
        <AddTemplateSubSection
          label="mark as rest day"
          size="lg"
          onClick={() => setIsMarkedRestDay(props.weekday, true)}
          icon={<FaBed size={24} color="rgba(102, 112, 133, 1)" />}
        />
      </Stack>
    );
  }

  if (weekdaySection.is_marked_rest_day) {
    return (
      <Flex
        height={"100%"}
        direction={"column"}
        padding={4}
        backgroundColor="#f0f0f0"
        background="linear-gradient(135deg, #f6f6f6 25%, transparent 25%, transparent 50%, #f6f6f6 50%, #f6f6f6 75%, transparent 75%, transparent)"
        backgroundSize="20px 20px"
        backgroundPosition="0 0, 25px 25px"
      >
        <AddTemplateSubSection
          label="unmark as rest day"
          onClick={() => setIsMarkedRestDay(props.weekday, false)}
          icon={<FaTrash size={24} color="rgba(102, 112, 133, 1)" />}
        />
      </Flex>
    );
  }

  return (
    <Flex height={"100%"} direction={"column"} p={4} gap={4}>
      {weekdaySection.subSections.length > 0 && (
        <AddTemplateSubSection
          label=""
          onClick={() => addNewSubSectionToActiveTemplate(props.weekday)}
        />
      )}
      {weekdaySection.subSections.length === 0 && (
        <Stack>
          <AddTemplateSubSection
            label="Add exercise"
            size="lg"
            onClick={() => addNewSubSectionToActiveTemplate(props.weekday)}
          />
          <Text fontSize="sm" color="gray.500" align={"center"}>
            or
          </Text>
          <AddTemplateSubSection
            label="mark as rest day"
            size="lg"
            onClick={() => setIsMarkedRestDay(props.weekday, true)}
            icon={<FaBed size={24} color="rgba(102, 112, 133, 1)" />}
          />
        </Stack>
      )}
      {weekdaySection.subSections
        .slice(0)
        .reverse()
        .map((subSection) => {
          return (
            <Flex key={subSection.id} width="100%">
              <ExerciseSubSection {...subSection} />
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
            </Flex>
          );
        })}
    </Flex>
  );
};

export const SECTION_WIDTH = 330;
