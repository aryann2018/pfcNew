import { useQuery } from "@tanstack/react-query";

import {
  DietPlanTemplatesQueryResponse,
  DietPlansQueryResponse,
  FoodIngredientsQueryResponse,
} from "./types";
import { get } from "../../../utilities/api";
import {
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
