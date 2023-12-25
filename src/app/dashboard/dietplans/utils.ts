import { parse } from "path";
import { TemplateSubSection } from "./[id]/FoodItemSubSection";
import { TemplateSection } from "./[id]/MealPlanSection";
import { Template } from "./[id]/TemplatePlanManager";
import {
  DietPlan,
  DietPlanTemplate,
  FoodItem,
  MealPlan,
  MealPlanTemplate,
} from "./api/types";

export const getTotalDietPlanMacros = (
  dietPlan: DietPlanTemplate
): {
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
} => {
  const totalMacros = dietPlan.meal_plan_templates?.reduce(
    (total: any, mealPlan: any) => {
      const mealPlanMacros = getTotalMealPlanMacros(mealPlan);
      return {
        calories: total.calories + mealPlanMacros.calories,
        carbs: total.carbs + mealPlanMacros.carbs,
        fat: total.fat + mealPlanMacros.fat,
        protein: total.protein + mealPlanMacros.protein,
      };
    },
    {
      calories: 0,
      carbs: 0,
      fat: 0,
      protein: 0,
    }
  );
  return totalMacros!;
};

export const getTotalMealPlanMacros = (
  mealPlan: MealPlanTemplate
): {
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
} => {
  const totalMacros = mealPlan.template_foods?.reduce(
    (total, foodItem) => {
      const foodItemMacros = getTotalFoodItemMarcos(foodItem);
      return {
        calories: total.calories + foodItemMacros.calories,
        carbs: total.carbs + foodItemMacros.carbs,
        fat: total.fat + foodItemMacros.fat,
        protein: total.protein + foodItemMacros.protein,
      };
    },
    {
      calories: 0,
      carbs: 0,
      fat: 0,
      protein: 0,
    }
  );
  return totalMacros;
};

export const getTotalFoodItemMarcos = (
  foodItem: FoodItem
): {
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
} => {
  if (!foodItem.food_ingredient) {
    return {
      calories: 0,
      carbs: 0,
      fat: 0,
      protein: 0,
    };
  }

  return {
    calories:
      (foodItem.food_ingredient.calories as unknown as number) *
      foodItem.quantity,
    carbs:
      (foodItem.food_ingredient.carbohydrates as unknown as number) *
      foodItem.quantity,
    fat:
      (foodItem.food_ingredient.fat as unknown as number) * foodItem.quantity,
    protein:
      (foodItem.food_ingredient.protein as unknown as number) *
      foodItem.quantity,
  };
};

// caculate the total macros for a templates

export const getTotalTemplateMacros = (
  template: Template
): {
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
} => {
  if (template === null || !template.sections) {
    return {
      calories: 0,
      carbs: 0,
      fat: 0,
      protein: 0,
    };
  }

  const totalMacros = template.sections.reduce(
    (total, section) => {
      const sectionMacros = getTotalSectionMacros(section);
      return {
        calories: total.calories + sectionMacros.calories,
        carbs: total.carbs + sectionMacros.carbs,
        fat: total.fat + sectionMacros.fat,
        protein: total.protein + sectionMacros.protein,
      };
    },
    {
      calories: 0,
      carbs: 0,
      fat: 0,
      protein: 0,
    }
  );
  return totalMacros;
};

// caculate the total macros for a section

export const getTotalSectionMacros = (
  section: TemplateSection
): {
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
} => {
  const totalMacros = section.subSections.reduce(
    (total, food) => {
      const foodMacros = getTotalFoodMacros(food);
      return {
        calories: total.calories + foodMacros.calories,
        carbs: total.carbs + foodMacros.carbs,
        fat: total.fat + foodMacros.fat,
        protein: total.protein + foodMacros.protein,
      };
    },
    {
      calories: 0,
      carbs: 0,
      fat: 0,
      protein: 0,
    }
  );
  return totalMacros;
};

// caculate the total macros for a food

export const getTotalFoodMacros = (
  food: TemplateSubSection
): {
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
} => {
  if (!food.id) {
    return {
      calories: 0,
      carbs: 0,
      fat: 0,
      protein: 0,
    };
  }

  if (!food.foodItem) {
    return {
      calories: 0,
      carbs: 0,
      fat: 0,
      protein: 0,
    };
  }

  return {
    calories: parseFloat(food.foodItem.calories!) * food.quantity,
    carbs: parseFloat(food.foodItem.carbohydrates!) * food.quantity,
    fat: parseFloat(food.foodItem.fat!) * food.quantity,
    protein: parseFloat(food.foodItem.protein!) * food.quantity,
  };
};
