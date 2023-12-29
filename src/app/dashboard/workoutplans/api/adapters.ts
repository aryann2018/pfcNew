import { Template } from "../[id]/TemplatePlanManager";
import { TemplateSubSection } from "../[id]/WorkoutExerciseSubSection";

import {
  WorkoutPlanType,
  WorkoutPlanPostPayload,
  WorkoutPlanTemplate,
  WorkoutPlanTemplatePostPayload,
  WorkoutExerciseType,
} from "./types";

export const templateFromWorkoutPlanTemplate = (
  workoutPlan: WorkoutPlanTemplate
): Template => {
  // Map each MealPlan in the DietPlanTemplate to a TemplateSection
  const sections = workoutPlan.workout_templates?.map((workoutPlan) => {
    // Map each FoodItem in the MealPlan to a TemplateSubSection
    const subsections: TemplateSubSection[] =
      workoutPlan.template_exercises.map((exercise) => ({
        id: exercise.exercise.id!,
        name: exercise.exercise.name, // Assuming you want to use the name of the food ingredient
        description: exercise.exercise.description,
        exercise: exercise.exercise, // Pass the whole FoodItem object
        sets: exercise.sets_and_reps.sets,
        reps: exercise.sets_and_reps.reps,
        rest: 0,
        notes: exercise.notes,
      }));

    return {
      id: workoutPlan.id,
      name: workoutPlan.name,
      description: workoutPlan.description,
      subSections: subsections,
      preffered_day_of_week: workoutPlan.preffered_day_of_week,
    };
  });

  // Create the final template using the sections created above
  const template = {
    id: workoutPlan.id,
    name: workoutPlan.name,
    description: workoutPlan.description,
    sections: sections, // Use the mapped sections
  };

  return template;
};

export const getWorkoutPlanPostPayload = (
  template: Template,
  client_id: string,
  coach_id: string,
  is_active: boolean,
  is_paused: boolean
): WorkoutPlanPostPayload => {
  // Map each TemplateSection to a MealPlan
  const workoutTemplates = template.sections.map((section) => {
    // Map each TemplateSubSection to a FoodItem
    const templateExercises = section.subSections.map((subSection) => ({
      exercise_id: subSection.id!,
      notes: subSection.notes || "",
      sets_and_reps: {
        sets: subSection.sets,
        reps: subSection.reps,
      },
    }));

    return {
      id: section.id,
      name: section.name,
      description: section.description,
      exercises: templateExercises,
      preffered_day_of_week: section.preffered_day_of_week,
    };
  });

  // Create the final DietPlanTemplate using the mealPlanTemplates created above
  const workoutPlanTemplate: WorkoutPlanPostPayload = {
    name: template.name,
    description: template.description,
    workouts: workoutTemplates,
    client_id: client_id,
    coach_id: coach_id,
    is_active: is_active,
    is_paused: is_paused,
    start_date: new Date().toISOString(),
    duration_in_days: 30,
  };

  return workoutPlanTemplate;
};

export const getWorkoutPlanTemplateFromWorkoutPlan = (
  template: Template
): WorkoutPlanTemplatePostPayload => {
  // Map each TemplateSection to a MealPlan
  const workoutTemplates = template.sections.map((section) => {
    // Map each TemplateSubSection to a FoodItem
    const templateExercises = section.subSections.map((subSection) => ({
      exercise_id: subSection.id!,
      notes: subSection.notes || "",
      sets_and_reps: {
        sets: subSection.sets,
        reps: subSection.reps,
      },
    }));

    return {
      id: section.id,
      name: section.name,
      description: section.description,
      template_exercises: templateExercises,
      preffered_day_of_week: section.preffered_day_of_week,
    };
  });

  // Create the final DietPlanTemplate using the mealPlanTemplates created above
  const workoutPlanTemplate: WorkoutPlanTemplatePostPayload = {
    name: template.name,
    description: template.description,
    workout_templates: workoutTemplates,
  };

  return workoutPlanTemplate;
};
