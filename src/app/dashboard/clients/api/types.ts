export type SubscriptionType = {
  id: string;
  created_at: string;
  modified_at: string;
  subscription_plan: {
    id: string;
    created_at: string;
    modified_at: string;
    type: string;
    description: string;
    inclusions: any[];
    price: string;
    duration_in_days: number;
    number_of_clients: number;
  };
  client: {
    id: string;
    created_at: string;
    modified_at: string;
    created_by: {
      property1: any;
      property2: any;
    };
    modified_by: {
      property1: any;
      property2: any;
    };
    first_name: string;
    middle_name: string;
    last_name?: string;
    user_type: string;
    phone_number: string;
    line_address: string;
    city: string;
    state: string;
    country: string;
    zip_code: string;
    sex: string;
    date_of_birth: string;
    height_in_cm: number;
    weight_in_gm: number;
    age: number;
    is_profile_updated: true;
    activity_level: string;
    somatotype: string;
    dietary_habits: string;
    fitness_notes: string;
    medical_conditions: string;
    allergies: string;
    bmi: number;
    bmi_category: string;
    bmr: number;
    tdee: number;
  };
  start_date: string;
  end_date: string;
  is_active: boolean;
  is_paused: boolean;
};

export type QuerySubscriptionsResponse = {
  data: SubscriptionType[];
};

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

export type ExerciseType = {
  id: string;
  created_at: string;
  modified_at: string;
  name: string;
  description: string;
  benefits: string[];
  exercise_type: string;
  equipment_type: string;
  exercise_level: string;
};

export type WorkoutExerciseType = {
  id: string;
  created_at: string;
  modified_at: string;
  exercise: ExerciseType;
  notes: string;
  sets_and_reps: string[];
};

export type WorkoutType = {
  id: string;
  created_at: string;
  modified_at: string;
  name: string;
  description: string;
  template_exercises: WorkoutExerciseType[];
};

export type WorkoutPlanType = {
  id: string;
  created_at: string;
  modified_at: string;
  name: string;
  description: string;
  workout_templates: WorkoutType[];
  is_private: boolean;
  is_active: boolean;
  is_success: boolean;
  message: null | string;
};

export type WorkoutPlansQueryResponseType = {
  data: WorkoutPlanType[];
  is_success: boolean;
  message: null | string;
};
