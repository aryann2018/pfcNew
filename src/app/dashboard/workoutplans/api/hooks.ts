import { useQuery } from "@tanstack/react-query";

import {
  WorkoutExerciseTemplate,
  WorkoutPlansQueryResponseType,
  WorkoutPlansTemplatesQueryResponseType,
} from "./types";
import { get } from "../../../utilities/api";
import {
  WORKOUT_PLANS_API,
  WORKOUT_PLAN_TEMPLATES_API,
} from "../../workoutplans/api/constants";

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
