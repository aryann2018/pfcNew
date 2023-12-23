import { DietPlan, FoodItem, MealPlan } from "./api/types";

export const getTotalDietPlanCalories = (dietPlan: DietPlan) => {
  const totalCalories = dietPlan.meal_plan_templates.reduce(
    (total, mealPlan) => {
      return total + getTotalMealPlanCalories(mealPlan);
    },
    0
  );
  return totalCalories;
};

export const getTotalMealPlanCalories = (mealPlan: MealPlan): number => {
  mealPlan.template_foods;
  if (!mealPlan.template_foods || mealPlan.template_foods.length === 0) {
    return 0;
  }

  return mealPlan.template_foods.reduce((total, foodItem) => {
    return total + getTotalFoodItemCalories(foodItem);
  }, 0);
};

export const getTotalFoodItemCalories = (foodItem: FoodItem): number => {
  foodItem.id;
  return (
    (foodItem.food_ingredient.calories as unknown as number) * foodItem.quantity
  );
};
