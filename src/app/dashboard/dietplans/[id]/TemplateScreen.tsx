"use client";
import TemplatePlanManager, {
  Template,
} from "@/app/common/TemplatePlanManager";
import { useGetDietPlanTemplates } from "../api/hooks";
import {
  getTotalDietPlanCalories,
  getTotalFoodItemCalories,
  getTotalMealPlanCalories,
} from "../utils";

interface TemplateScreenProps {
  isNew: boolean;
  planId?: string;
  clientId?: string;
}

export const TemplateScreen = (props: TemplateScreenProps) => {
  const { data, error, isLoading } = useGetDietPlanTemplates();
  console.log(data, error, isLoading);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (!data || !data.data) {
    return <div>No data</div>;
  }

  const templateItems: Template[] = data!.data.map((template) => {
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
                  return `${key}: 1}`;
                }),
              onDeleteClick: () => ({}),
              LeftInfo: "250 gm",
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
        console.log(id, value);
      }}
      templateItems={templateItems}
    />
  );
};
