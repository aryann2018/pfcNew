import { type } from "os";

export type FoodIngredient = {
  id: string;
  created_at?: string;
  modified_at?: string;
  name: string;
  description: string;
  unit_of_measure?: string;
  portion_size?: string;
  calories?: string;
  protein?: string;
  fat?: string;
  carbohydrates?: string;
  is_private?: boolean;
  is_allergen?: boolean;
  photo?: null | string;
};

export type FoodItem = {
  id?: string;
  created_at?: string;
  modified_at?: string;
  food_ingredient: FoodIngredient;
  quantity: number;
};

export type MealPlan = {
  id?: string;
  created_at?: string;
  modified_at?: string;
  name: string;
  description: string;
  preffered_time: string;
  foods: FoodItem[];
};

export type DietPlan = {
  id?: string;
  created_at?: string;
  modified_at?: string;
  name: string;
  description: string;
  meal_plans: MealPlan[];
  is_private: boolean;
  is_active: boolean;
};

export type DietPlansQueryResponse = {
  data: DietPlan[];
  is_success: boolean;
  message: null | string;
};

export type MealPlanTemplate = Omit<MealPlan, "foods"> & {
  template_foods: FoodItem[];
};

export type DietPlanTemplate = Omit<DietPlan, "meal_plans"> & {
  meal_plan_templates?: MealPlanTemplate[];
};

export type DietPlanTemplatesQueryResponse = DietPlansQueryResponse & {
  data: DietPlanTemplate[];
};

export type FoodIngredientsQueryResponse = {
  data: FoodIngredient[];
  is_success: boolean;
  message: null | string;
};

export type DietPlanPostPayload = {
  client_id: string;
  coach_id: string;
  name: string;
  description: string;
  is_active: boolean;
  is_paused: boolean;
  start_date: string;
  duration_in_days: number;
  meal_plans: {
    name: string;
    description: string;
    foods: {
      food_ingredient_id: string;
      quantity: number;
    }[];
    preffered_time: string;
    diet_plan_id?: string;
  }[];
};

export type DietPlanTemplatePostPayload = {
  name: string;
  description: string;
  meal_plan_templates: {
    name: string;
    description: string;
    template_foods: {
      food_ingredient_id: string;
      quantity: number;
    }[];
    preffered_time: string;
  }[];
  diet_plan_template_id?: string;
};

export type DietPlanPostResponse = {
  data: DietPlan;
  is_success: boolean;
  message: null | string;
};
