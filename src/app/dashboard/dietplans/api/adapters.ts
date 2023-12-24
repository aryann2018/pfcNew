import { Template } from "../[id]/TemplatePlanManager";
import { getTotalDietPlanMacros } from "../utils";
import {
  createTemplate,
  createTemplateSection,
  createTemplateSubSection,
} from "./mocks";
import { DietPlanTemplate } from "./types";

export const templateFromDietPlanTemplate = (
  dietPlanTemplate: DietPlanTemplate
): Template => {
  // Map each MealPlan in the DietPlanTemplate to a TemplateSection
  const sections = dietPlanTemplate.meal_plan_templates.map((mealPlan) => {
    // Map each FoodItem in the MealPlan to a TemplateSubSection
    const subsections = mealPlan.template_foods.map((foodItem) =>
      createTemplateSubSection({
        id: foodItem.food_ingredient.id,
        name: foodItem.food_ingredient.name, // Assuming you want to use the name of the food ingredient
        description: foodItem.food_ingredient.description,
        foodItem: foodItem.food_ingredient, // Pass the whole FoodItem object
        quantity:
          foodItem.quantity *
          (foodItem.food_ingredient.portion_size as unknown as number),
        unit: foodItem.food_ingredient.unit_of_measure,
        macros: getTotalDietPlanMacros(dietPlanTemplate), // Pass the total macros of the DietPlanTemplate
      })
    );

    return createTemplateSection({
      id: mealPlan.id,
      name: mealPlan.name,
      description: mealPlan.description,
      subSections: subsections, // Use the mapped subsections
      // Add any additional fields needed for a section here
    });
  });

  // Create the final template using the sections created above
  const template = createTemplate({
    id: dietPlanTemplate.id,
    name: dietPlanTemplate.name,
    description: dietPlanTemplate.description,
    sections: sections, // Use the mapped sections
    macros: getTotalDietPlanMacros(dietPlanTemplate), // Pass the total macros of the DietPlanTemplate
    // Add any additional fields needed for the template here
  });

  return template;
};

export const dietPlanTemplateFromTemplate = (template: Template) => {
  // Map each TemplateSection to a MealPlan
  const mealPlanTemplates = template.sections.map((section) => {
    // Map each TemplateSubSection to a FoodItem
    const templateFoods = section.subSections.map((subSection) => ({
      id: subSection.id,
      quantity: subSection.quantity,
      food_ingredient: subSection.foodItem, // Pass the whole FoodItem object
      // Add any additional fields needed for a FoodItem here
    }));

    return {
      id: section.id,
      name: section.name,
      description: section.description,
      template_foods: templateFoods, // Use the mapped templateFoods
      // Add any additional fields needed for a MealPlan here
    };
  });

  // Create the final DietPlanTemplate using the mealPlanTemplates created above
  const dietPlanTemplate = {
    id: template.id,
    name: template.name,
    description: template.description,
    meal_plan_templates: mealPlanTemplates, // Use the mapped mealPlanTemplates
    // Add any additional fields needed for the DietPlanTemplate here
  };

  return dietPlanTemplate;
};
