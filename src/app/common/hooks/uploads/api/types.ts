type GenerateUploadPresignedPostRequest = {
  original_file_name: string;
  file_type: string;
  file_size: number;
};

type PresignedPostData = {
  url: string;
  fields: {
    key: string;
    "x-amz-algorithm": string;
    "x-amz-credential": string;
    "x-amz-date": string;
    policy: string;
    "x-amz-signature": string;
  };
};

type GenerateUploadPresignedPostResponse = {
  original_file_name: string;
  file_name: string;
  file_size: number;
  file_type: string;
  upload_to: string;
  presigned_post_data: PresignedPostData;
  is_success: boolean;
  message: string;
};

type GenerateUploadPresignedPostArgs = {
  onSuccess: (response: GenerateUploadPresignedPostResponse) => void;
  onError: (error: Error) => void;
};
