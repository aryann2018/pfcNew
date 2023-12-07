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

export type WorkoutExerciseTemplate = WorkoutExerciseType & {
  exercise: ExerciseType;
};

export type WorkoutTemplate = WorkoutType & {
  template_exercises: WorkoutExerciseTemplate[];
};

export type WorkoutPlanTemplate = WorkoutPlanType & {
  meal_plan_templates: WorkoutType[];
};

export type WorkoutPlansTemplatesQueryResponseType =
  WorkoutPlansQueryResponseType & {
    data: WorkoutPlanTemplate[];
  };
