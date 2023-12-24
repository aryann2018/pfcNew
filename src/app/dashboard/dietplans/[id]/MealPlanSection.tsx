import { Flex, HStack, Text } from "@chakra-ui/react";
import { MacrosTicker } from "./MacrosTIcker";
import { styles } from "./TemplatePlanManager";

import {
  AddTemplateSubSection,
  FoodItemSubSection,
  TemplateSubSection,
} from "./FoodItemSubSection";

export interface TemplateSection {
  id: string;
  name: string;
  description: string;
  subSections: TemplateSubSection[];
  rightTopInfo: any;
}

interface TemplateSectionProps extends TemplateSection {}

export const MealPlanSection = (props: TemplateSectionProps) => {
  return (
    <Flex direction={"column"}>
      <HStack justifyContent="space-between" p={2}>
        <Text {...styles.sectionTitle}>{props.name}</Text>
        <MacrosTicker size="sm" protien={0} fat={0} carbs={0} calories={0} />
      </HStack>
      <Flex direction={"column"} p={2} gap={"4"}>
        {props.subSections.map((subSection) => (
          <FoodItemSubSection key={subSection.id} {...subSection} />
        ))}
        <AddTemplateSubSection label={"Add dish"} onClick={() => {}} />
      </Flex>
    </Flex>
  );
};
