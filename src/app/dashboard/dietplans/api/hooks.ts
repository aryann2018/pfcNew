import { useMutation, useQuery } from "@tanstack/react-query";

import {
  DietPlanPostPayload,
  DietPlanPostResponse,
  DietPlanTemplatePostPayload,
  DietPlanTemplatesQueryResponse,
  DietPlansQueryResponse,
  FoodIngredientsQueryResponse,
} from "./types";
import { get, post } from "../../../utilities/api";
import {
  COACH_PROFILE,
  DIET_PLANS_API,
  DIET_PLANS_TEMPLATES_API,
  FOOD_INGRIDENTS_API,
} from "../../dietplans/api/constants";

export const useGetDietPlans = ({ client_id }: { client_id: string }) => {
  const query = useQuery({
    queryKey: [DIET_PLANS_API],
    queryFn: async () => {
      try {
        const res = await get<DietPlansQueryResponse>(DIET_PLANS_API, {
          params: { client_id },
        });
        return res?.data;
      } catch (error) {
        error;
      }
    },
  });

  return query;
};

export const useGetDietPlanTemplates = () => {
  const query = useQuery({
    queryKey: [DIET_PLANS_TEMPLATES_API],
    queryFn: async () => {
      try {
        const res = await get<DietPlanTemplatesQueryResponse>(
          DIET_PLANS_TEMPLATES_API
        );
        return res?.data;
      } catch (error) {
        error;
      }
    },
  });

  return query;
};

export const useGetFoodIngredients = (searchTerm: string) => {
  const query = useQuery({
    queryKey: [`FOOD_INGRIDENTS_API-${searchTerm}`],
    queryFn: async () => {
      try {
        const res = await get<FoodIngredientsQueryResponse>(
          `${FOOD_INGRIDENTS_API}?q=${searchTerm}`
        );
        return res?.data;
      } catch (error) {
        error;
      }
    },
  });

  return query;
};

export const useMutateDietPlan = ({ onSuccess, onError }: any) => {
  const mutation = useMutation({
    mutationFn: async (request: DietPlanPostPayload) => {
      const res = await post<DietPlanPostPayload, DietPlanPostResponse>(
        DIET_PLANS_API,
        request
      );
      return res!.data;
    },
    onSuccess,
    onError,
  });

  return mutation;
};

export const useMutateDietPlanTemplate = ({ onSuccess, onError }: any) => {
  const mutation = useMutation({
    mutationFn: async (request: DietPlanTemplatePostPayload) => {
      const res = await post<DietPlanTemplatePostPayload, DietPlanPostResponse>(
        DIET_PLANS_TEMPLATES_API,
        request
      );
      return res!.data;
    },
    onSuccess,
    onError,
  });

  return mutation;
};

export const useQueryCoachProfile = () => {
  const query = useQuery({
    queryKey: ["COACH_PROFILE"],
    queryFn: async () => {
      try {
        const res = await get<any>(COACH_PROFILE);
        return res?.data;
      } catch (error) {
        error;
      }
    },
  });

  return query;
};
