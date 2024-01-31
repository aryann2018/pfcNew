import { useMutation, useQuery } from "@tanstack/react-query";

import {
  ExercisesQueryResponse,
  WorkoutPlanPostPayload,
  WorkoutPlanPostResponse,
  WorkoutPlanTemplatePostPayload,
  WorkoutPlansQueryResponseType,
  WorkoutPlansTemplatesQueryResponseType,
} from "./types";
import { get, post } from "../../../utilities/api";

import {
  COACH_PROFILE,
  WORKOUT_PLANS_API,
  WORKOUT_PLAN_TEMPLATES_API,
  EXERCISES_API,
} from "./constants";

export const useGetWorkoutPlanTemplates = () => {
  const query = useQuery({
    queryKey: [WORKOUT_PLAN_TEMPLATES_API],
    queryFn: async () => {
      try {
        const res = await get<WorkoutPlansTemplatesQueryResponseType>(
          WORKOUT_PLAN_TEMPLATES_API
        );
        return res?.data;
      } catch (error) {
        error;
      }
    },
  });

  return query;
};

export const useGetWorkoutPlans = ({ client_id }: { client_id: string }) => {
  const query = useQuery({
    queryKey: [WORKOUT_PLANS_API],
    queryFn: async () => {
      try {
        const res = await get<WorkoutPlansQueryResponseType>(
          WORKOUT_PLANS_API,
          {
            params: { client_id },
          }
        );
        return res?.data;
      } catch (error) {
        error;
      }
    },
  });

  return query;
};

export const useGetExercises = (searchTerm: string) => {
  const query = useQuery({
    queryKey: [`EXERCISES_API-${searchTerm}`],
    queryFn: async () => {
      try {
        const res = await get<ExercisesQueryResponse>(
          `${EXERCISES_API}?q=${searchTerm}`
        );
        return res?.data;
      } catch (error) {
        error;
      }
    },
  });

  return query;
};

export const useMutateWorkoutPlan = ({ onSuccess, onError }: any) => {
  const mutation = useMutation({
    mutationFn: async (request: WorkoutPlanPostPayload) => {
      const res = await post<WorkoutPlanPostPayload, WorkoutPlanPostResponse>(
        WORKOUT_PLANS_API,
        request
      );
      return res!.data;
    },
    onSuccess,
    onError,
  });

  return mutation;
};

export const useMutateWorkoutPlanTemplate = ({ onSuccess, onError }: any) => {
  const mutation = useMutation({
    mutationFn: async (request: WorkoutPlanTemplatePostPayload) => {
      const res = await post<
        WorkoutPlanTemplatePostPayload,
        WorkoutPlanPostResponse
      >(WORKOUT_PLAN_TEMPLATES_API, request);
      return res!.data;
    },
    onSuccess,
    onError,
  });

  return mutation;
};
