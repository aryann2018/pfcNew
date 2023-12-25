import { CloseButton, Flex, HStack, Text } from "@chakra-ui/react";
import { MacrosTicker } from "./MacrosTIcker";
import { styles } from "./TemplatePlanManager";

import {
  AddTemplateSubSection,
  FoodItemSubSection,
  TemplateSubSection,
} from "./FoodItemSubSection";
import EditableText from "@/app/common/inputs/EditableInput";
import useDietPlanStore from "./dietplansStore";
import { getTotalSectionMacros } from "../utils";

export interface TemplateSection {
  id: string;
  name: string;
  description: string;
  subSections: TemplateSubSection[];
  prefferedTime: string;
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

  const macros = getTotalSectionMacros(props);

  return (
    <div>
      <Flex direction={"column"}>
        <HStack justifyContent="space-between" p={2}>
          <EditableText defaultValue={props.name} />
          <MacrosTicker
            size="sm"
            protien={macros.protein}
            fat={macros.fat}
            carbs={macros.carbs}
            calories={macros.calories}
          />
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
                unit={"-"}
                macros={macros}
                foodItem={subSection.foodItem}
                style={{
                  zIndex: props.subSections.length - index,
                }}
                mealId={props.id}
                id={subSection.id}
              />
            ) : (
              <FoodItemSubSection
                key={subSection.id}
                isNew={false}
                name={subSection.name}
                description={subSection.description}
                onDelete={() => {}}
                quantity={subSection.quantity}
                unit={subSection.unit}
                style={{
                  zIndex: props.subSections.length - index,
                }}
                mealId={props.id}
                id={subSection.id}
                foodItem={subSection.foodItem}
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
    </div>
  );
};
