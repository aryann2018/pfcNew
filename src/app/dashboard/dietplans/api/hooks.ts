import { useQuery } from "@tanstack/react-query";

import {
  DietPlanTemplatesQueryResponse,
  DietPlansQueryResponse,
} from "./types";
import { get } from "../../../utilities/api";
import {
  DIET_PLANS_API,
  DIET_PLANS_TEMPLATES_API,
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
        console.log(error);
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
        console.log(error);
      }
    },
  });

  return query;
};
