import { useMutation, useQuery } from "@tanstack/react-query";

import {
  GET_DIET_PLANS,
  GET_SUBSCRIPTIONS,
  GET_WORKOUT_PLANS,
} from "./constants";
import {
  DietPlansQueryResponse,
  QuerySubscriptionsResponse,
  WorkoutPlansQueryResponseType,
} from "./types";
import { patch, get } from "../../../utilities/api";

export const useGetSubscriptions = () => {
  const query = useQuery({
    queryKey: [GET_SUBSCRIPTIONS],
    queryFn: async () => {
      try {
        const res = await get<QuerySubscriptionsResponse>(GET_SUBSCRIPTIONS);
        return res?.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return query;
};

export const useGetDietPlans = ({ client_id }: { client_id: string }) => {
  const query = useQuery({
    queryKey: [GET_DIET_PLANS],
    queryFn: async () => {
      try {
        const res = await get<DietPlansQueryResponse>(GET_DIET_PLANS, {
          params: { client_id },
        });
        return res?.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return query;
};

export const useGetWorkoutPlans = ({ client_id }: { client_id: string }) => {
  const query = useQuery({
    queryKey: [GET_WORKOUT_PLANS],
    queryFn: async () => {
      try {
        const res = await get<WorkoutPlansQueryResponseType>(
          GET_WORKOUT_PLANS,
          {
            params: { client_id },
          }
        );
        return res?.data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return query;
};
