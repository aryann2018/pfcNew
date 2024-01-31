import { get, patch } from "@/app/utilities/api";
import { useQuery, useMutation } from "@tanstack/react-query";
import { COACH_PROFILE } from "./constants";

export const useQueryCoachProfile = () => {
  const query = useQuery({
    queryKey: ["COACH_PROFILE"],
    queryFn: async () => {
      const res = await get<CoachProfileQueryResponse>(COACH_PROFILE);
      return res;
    },
  });

  return query;
};

export const usePatchCoachProfileMutation = () => {
  const mutation = useMutation<
    CoachProfileQueryResponse,
    Error,
    CoachProfilePatchRequest
  >({
    mutationFn: async (request: CoachProfilePatchRequest) => {
      const res = await patch<
        CoachProfilePatchRequest,
        CoachProfileQueryResponse
      >(COACH_PROFILE, request);
      return res!.data as CoachProfileQueryResponse;
    },
  });

  return mutation;
};
