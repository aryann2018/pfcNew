"use client";
import TemplatePlanManager, { Template } from "./TemplatePlanManager";

import { useGetDietPlanTemplates, useGetFoodIngredients } from "../api/hooks";

import {
  getTotalDietPlanCalories,
  getTotalFoodItemCalories,
  getTotalMealPlanCalories,
} from "../utils";
import { useRouter } from "next/navigation";

interface TemplateScreenProps {
  isNew: boolean;
  planId?: string;
  clientId?: string;
}

export const TemplateScreen = (props: TemplateScreenProps) => {
  const { data, error, isLoading } = useGetDietPlanTemplates();

  const { data: foodIngredientsData } = useGetFoodIngredients();
  foodIngredientsData;

  const router = useRouter();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data || !data.data) {
    return <div>No data</div>;
  }

  const templates: Template[] = data!.data.map((template) => {
    return {
      id: template.id,
      name: template.name,
      sections: template.meal_plan_templates.map((section) => {
        return {
          description: "hey this is the section",
          rightTopInfo: `${getTotalMealPlanCalories(section)} kcal`,
          id: section.id,
          name: section.name,
          subSections: section.template_foods.map((subSection) => {
            return {
              id: subSection.id,
              name: subSection.food_ingredient.name,
              description: subSection.food_ingredient.description,
              labels: Object.keys(subSection.food_ingredient)
                .filter((key) =>
                  ["fat", "protein", "carbohydrates"].includes(key)
                )
                .map((key) => {
                  return `${key}: 100`;
                }),
              onDeleteClick: () => ({}),
              LeftInfo:
                (subSection.food_ingredient.portion_size as unknown as number) *
                subSection.quantity,
              rightTopInfo: `${getTotalFoodItemCalories(subSection)} kcal`,
            };
          }),
        };
      }),
      description: "hey this is the template",
      rightTopInfo: `${getTotalDietPlanCalories(template)} kcal`,
    };
  });

  return (
    <TemplatePlanManager
      isNew={props.isNew}
      onAssignPress={(id, value) => {
        router.push(`/dashboard/clients/${props.clientId}/`);
      }}
      templates={templates}
      onAddNewFoodItem={() => {}}
    />
  );
};
