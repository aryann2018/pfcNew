type GenerateUploadPresignedPostRequest = {
  file_name: string;
  file_type: string;
  file_size: number;
};

type GenerateUploadPresignedPostResponse = {
  url: string;
  fields: {
    [key: string]: string;
  };
};

type GenerateUploadPresignedPostArgs = {
  onSuccess: (response: GenerateUploadPresignedPostResponse) => void;
  onError: (error: Error) => void;
};
