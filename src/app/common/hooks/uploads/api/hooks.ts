import { post } from "@/app/utilities/api";
import { useMutation } from "@tanstack/react-query";

export const useGenerateUploadPresignedPost = ({
  onSuccess,
  onError,
}: GenerateUploadPresignedPostArgs) => {
  const mutation = useMutation({
    mutationFn: async (request: GenerateUploadPresignedPostRequest) => {
      const res = await post<
        GenerateUploadPresignedPostRequest,
        GenerateUploadPresignedPostResponse
      >(UPLOADS_API_URL, request);
      return res!.data;
    },
    onSuccess,
    onError,
  });

  return mutation;
};
