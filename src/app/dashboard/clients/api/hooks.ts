import { useMutation, useQuery } from "@tanstack/react-query";

import { GET_SUBSCRIPTIONS } from "./constants";
import { QuerySubscriptionsResponse } from "./types";
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
