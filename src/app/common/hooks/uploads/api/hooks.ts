import { post } from "@/app/utilities/api";
import { useMutation } from "@tanstack/react-query";
import { UPLOADS_API_URL } from "./constants";
export const useGenerateUploadPresignedPost = ({
  onSuccess,
  onError,
}: GenerateUploadPresignedPostArgs) => {
  const mutation = useMutation<
    GenerateUploadPresignedPostResponse,
    Error,
    GenerateUploadPresignedPostRequest
  >({
    mutationFn: async (request: GenerateUploadPresignedPostRequest) => {
      const res = await post<
        GenerateUploadPresignedPostRequest,
        GenerateUploadPresignedPostResponse
      >(UPLOADS_API_URL, request);
      return res!.data as GenerateUploadPresignedPostResponse;
    },
    onSuccess,
    onError,
  });

  return mutation;
};
