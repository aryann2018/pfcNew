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
  loaded: number;
  total: number;
};

type UploadFileState = {
  loading: boolean;
  error?: UploadFileError;
  progress?: UploadFileProgress;
  data?: UploadFileResponse;
};
