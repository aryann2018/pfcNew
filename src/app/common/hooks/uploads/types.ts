type UploadFileRequest = {
  file: File;
  url: string;
  fields: {
    [key: string]: string;
  };
};

type UploadFileResponse = {
  url: string;
};

type UploadFileError = {
  message: string;
};

type UploadFileProgress = {
  uploaded: number;
  total: number;
};

type UploadFileState = {
  loading: boolean;
  error?: UploadFileError | null;
  progress?: UploadFileProgress;
  data?: UploadFileResponse;
  presignedData?: PresignedPostData;
};
