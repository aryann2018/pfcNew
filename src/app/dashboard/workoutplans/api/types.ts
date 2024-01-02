//types for backend

export type ExerciseType = {
  id?: string;
  created_at?: string;
  modified_at?: string;
  name: string;
  description: string;
  benefits?: string[];
  exercise_type?: string;
  equipment_type?: string;
  exercise_level?: string;
  muscle_targeted?: string;
};

export type WorkoutExerciseType = {
  id?: string;
  created_at?: string;
  modified_at?: string;
  exercise: ExerciseType;
  notes?: string;
  sets_and_reps: {
    sets: number;
    reps: number;
  };
};

export type WorkoutType = {
  id: string;
  created_at: string;
  modified_at: string;
  name: string;
  description: string;
  preffered_day_of_week: string;
  exercises: WorkoutExerciseType[];
};

export type WorkoutPlanType = {
  id: string;
  created_at: string;
  modified_at: string;
  name: string;
  description: string;
  workouts: WorkoutType[];
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

export type WorkoutTemplate = Omit<WorkoutType, "exercises"> & {
  template_exercises: WorkoutExerciseTemplate[];
};

export type WorkoutPlanTemplate = Omit<WorkoutPlanType, "workouts"> & {
  workout_templates: WorkoutTemplate[];
};

export type WorkoutPlansTemplatesQueryResponseType = Omit<
  WorkoutPlansQueryResponseType,
  "data"
> & {
  data: WorkoutPlanTemplate[];
};

export type ExercisesQueryResponse = {
  data: ExerciseType[];
  is_success: boolean;
  message: null | string;
};

export type WorkoutPlanPostPayload = {
  client_id: string;
  coach_id: string;
  name: string;
  description: string;
  is_active: boolean;
  is_paused: boolean;
  start_date: string;
  duration_in_days: number;
  workouts: {
    name: string;
    description: string;
    workout_exercises: {
      exercise_id: string;
      workout_id?: string;
      notes: string;
      sets_and_reps: {
        sets: number;
        reps: number;
      };
    }[];
    preffered_day_of_week: string;
    workout_plan_id?: string;
  }[];
};

export type WorkoutPlanTemplatePostPayload = {
  name: string;
  description: string;
  workout_templates: {
    name: string;
    description: string;
    template_exercises: {
      exercise_id: string;
      workout_id?: string;
      notes: string;
      sets_and_reps: {
        sets: number;
        reps: number;
      };
    }[];
    preffered_day_of_week: string;
    workout_template_id?: string;
  }[];

  workout_plan_template_id?: string;
};

export type WorkoutPlanPostResponse = {
  data: WorkoutPlanType;
  is_success: boolean;
  message: null | string;
};

// types for frontend
