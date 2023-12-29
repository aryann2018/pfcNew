import { Flex, HStack } from "@chakra-ui/react";

import {
  AddTemplateSubSection,
  FoodItemSubSection,
  TemplateSubSection,
} from "./WorkoutExerciseSubSection";
import EditableText from "@/app/common/inputs/EditableInput";
import useDietPlanStore from "./dietplansStore";

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
  const {
    addNewSubSectionToActiveTemplate,
    updateSectionName,
    removeSubSectionFromActiveTemplate,
  } = useDietPlanStore();

  return (
    <div>
      <Flex direction={"column"}>
        <HStack justifyContent="space-between" p={2}>
          <EditableText
            defaultValue={props.name}
            onChange={(text) => updateSectionName(props.id, text)}
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
                onDelete={() => {
                  removeSubSectionFromActiveTemplate(props.id, subSection.id!);
                }}
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
                onDelete={(id) => {
                  removeSubSectionFromActiveTemplate(props.id, id);
                }}
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
