import { Template } from "../[id]/TemplatePlanManager";
import { getTotalDietPlanMacros } from "../utils";
import {
  createTemplate,
  createTemplateSection,
  createTemplateSubSection,
} from "./mocks";
import {
  WorkoutPlanType,
  WorkoutPlanPostPayload,
  WorkoutPlanTemplate,
  WorkoutPlanTemplatePostPayload,
} from "./types";

export const templateFromDietPlanTemplate = (
  dietPlanTemplate: WorkoutPlanTemplate
): Template => {
  // Map each MealPlan in the DietPlanTemplate to a TemplateSection
  const sections = dietPlanTemplate.workout_plan_templates?.map(
    (workoutPlan) => {
      // Map each FoodItem in the MealPlan to a TemplateSubSection
      const subsections = workoutPlan.template_exercises.map((exercise) =>
        createTemplateSubSection({
          id: exercise.exercise.id,
          name: exercise.exercise.name, // Assuming you want to use the name of the food ingredient
          description: exercise.exercise.description,
          exercise: exercise.exercise, // Pass the whole FoodItem object
          sets_and_reps: exercise.sets_and_reps,
          notes: exercise.notes,
        })
      );

      return createTemplateSection({
        id: workoutPlan.id,
        name: workoutPlan.name,
        description: workoutPlan.description,
        subSections: subsections, // Use the mapped subsections
        // Add any additional fields needed for a section here
      });
    }
  );

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

export const getDietPlanPostPayload = (
  template: Template,
  client_id: string,
  coach_id: string,
  is_active: boolean,
  is_paused: boolean
): DietPlanPostPayload => {
  // Map each TemplateSection to a MealPlan
  const mealPlanTemplates = template.sections.map((section) => {
    // Map each TemplateSubSection to a FoodItem
    const templateFoods = section.subSections.map((subSection) => ({
      id: subSection.id,
      quantity: subSection.quantity,
      food_ingredient_id: subSection.foodItem?.id!, // Pass the whole FoodItem object
      // Add any additional fields needed for a FoodItem here
    }));

    return {
      id: section.id,
      name: section.name,
      description: section.description,
      foods: templateFoods,
      preffered_time: section.prefferedTime,
    };
  });

  // Create the final DietPlanTemplate using the mealPlanTemplates created above
  const dietPlanTemplate: DietPlanPostPayload = {
    name: template.name,
    description: template.description,
    meal_plans: mealPlanTemplates,
    client_id: client_id,
    coach_id: coach_id,
    is_active: is_active,
    is_paused: is_paused,
    start_date: new Date().toISOString(),
    duration_in_days: 30,
  };

  return dietPlanTemplate;
};

export const getDietPlanTemplateFromDietPlan = (
  template: Template
): DietPlanTemplatePostPayload => {
  // Map each TemplateSection to a MealPlan
  const mealPlanTemplates = template.sections.map((section) => {
    // Map each TemplateSubSection to a FoodItem
    const templateFoods = section.subSections.map((subSection) => ({
      id: subSection.id,
      quantity: subSection.quantity,
      food_ingredient_id: subSection.foodItem?.id!, // Pass the whole FoodItem object
      // Add any additional fields needed for a FoodItem here
    }));

    return {
      id: section.id,
      name: section.name,
      description: section.description,
      template_foods: templateFoods,
      preffered_time: section.prefferedTime,
    };
  });

  // Create the final DietPlanTemplate using the mealPlanTemplates created above
  const dietPlanTemplate: DietPlanTemplatePostPayload = {
    name: template.name,
    description: template.description,
    meal_plan_templates: mealPlanTemplates,
  };

  return dietPlanTemplate;
};
