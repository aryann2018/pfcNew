import { Flex, HStack, Text } from "@chakra-ui/react";
import { MacrosTicker } from "./MacrosTIcker";
import { styles } from "./TemplatePlanManager";

import {
  AddTemplateSubSection,
  FoodItemSubSection,
  TemplateSubSection,
} from "./FoodItemSubSection";
import EditableText from "@/app/common/inputs/EditableInput";
import useDietPlanStore from "./dietplansStore";
import { getTotalFoodMacros, getTotalSectionMacros } from "../utils";

export interface TemplateSection {
  id: string;
  name: string;
  description: string;
  subSections: TemplateSubSection[];
  macros: {
    protein: number;
    fat: number;
    carbs: number;
    calories: number;
  };
}

interface TemplateSectionProps extends TemplateSection {}

export const MealPlanSection = (props: TemplateSectionProps) => {
  const { addNewSubSectionToActiveTemplate } = useDietPlanStore();

  return (
    <Flex direction={"column"}>
      <HStack justifyContent="space-between" p={2}>
        <EditableText defaultValue={props.name} />
        <MacrosTicker size="sm" protien={0} fat={0} carbs={0} calories={0} />
      </HStack>
      <Flex direction={"column"} p={2} gap={"4"}>
        {props.subSections.map((subSection, index) =>
          subSection.isNew ? (
            <FoodItemSubSection
              key={subSection.id}
              isNew={true}
              name={"New Dish"}
              description={"New Dish"}
              onDelete={() => {}}
              quantity={0}
              unit={"g"}
              macros={{
                protein: 0,
                fat: 0,
                carbs: 0,
                calories: 0,
              }}
              foodItem={subSection.foodItem}
              style={{
                zIndex: props.subSections.length - index,
              }}
              mealId={props.id}
            />
          ) : (
            <FoodItemSubSection
              key={subSection.id}
              isNew={false}
              name={subSection.name}
              description={subSection.description}
              onDelete={() => {}}
              quantity={
                subSection.quantity *
                (subSection.foodItem?.portion_size! as unknown as number)
              }
              unit={"g"}
              macros={getTotalFoodMacros(subSection!)}
              style={{
                zIndex: props.subSections.length - index,
              }}
              mealId={props.id}
            />
          )
        )}
        <AddTemplateSubSection
          label={"Add dish"}
          onClick={() => {
            addNewSubSectionToActiveTemplate(props.id);
          }}
        />
      </Flex>
    </Flex>
  );
};
