import { type } from "os";

export type FoodIngredient = {
  id: string;
  created_at: string;
  modified_at: string;
  name: string;
  description: string;
  unit_of_measure: string;
  portion_size: string;
  calories: string;
  protein: string;
  fat: string;
  carbohydrates: string;
  is_private: boolean;
  is_allergen: boolean;
  photo: null | string;
};

export type FoodItem = {
  id: string;
  created_at: string;
  modified_at: string;
  food_ingredient: FoodIngredient;
  quantity: number;
};

export type MealPlan = {
  id: string;
  created_at: string;
  modified_at: string;
  name: string;
  description: string;
  preffered_time: string;
  template_foods: FoodItem[];
};

export type DietPlan = {
  id: string;
  created_at: string;
  modified_at: string;
  name: string;
  description: string;
  meal_plan_templates: MealPlan[];
  is_private: boolean;
  is_active: boolean;
  is_success: boolean;
  message: null | string;
};

export type DietPlansQueryResponse = {
  data: DietPlan[];
  is_success: boolean;
  message: null | string;
};

export type MealPlanTemplate = MealPlan & {
  template_foods: FoodItem[];
};

export type DietPlanTemplate = DietPlan & {
  meal_plan_templates: MealPlan[];
};

export type DietPlanTemplatesQueryResponse = DietPlansQueryResponse & {
  data: DietPlanTemplate[];
};
