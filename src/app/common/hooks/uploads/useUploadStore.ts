import { useGenerateUploadPresignedPost } from "./api/hooks";
import { create } from "zustand";
import { generateRandomId } from "@/app/utilities/utils";

const onUploadGeneratePresignedPostSuccess =
  (
    file: File,
    onSuccess: (data: PresignedPostData) => void,
    OnError: (error: any) => void
  ) =>
  (
    presignedData: GenerateUploadPresignedPostResponse["presigned_post_data"]
  ) => {
    const { url, fields } = presignedData;
    const formData = new FormData();
    const FileBlob = new Blob([file], { type: file.type });

    Object.entries({ ...fields, file: FileBlob }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          onSuccess(presignedData);
        } else {
          OnError(res);
        }
      })
      .catch(OnError);
  };

interface UploadState {
  files: {
    id: string;
    file: File;
  }[];
  addFile: (file: File) => void;
  removeFile: (id: string) => void;
  removeFiles: () => void;
  currentUploads: {
    [key: string]: UploadFileState;
  };
  setUploadState: (id: string, state: UploadFileState) => void;
  removeUploadState: (id: string) => void;
}

export const useUploadStore = create<UploadState>((set, get) => ({
  files: [],
  addFile: (file) => {
    set((state) => ({
      files: [...state.files, { id: generateRandomId(), file }],
    }));
  },
  removeFile: (id) => {
    set((state) => ({
      files: state.files.filter((file) => file.id !== id),
    }));
  },

  removeFiles: () => {
    set((state) => ({
      files: [],
    }));
  },
  currentUploads: {},
  setUploadState: (id, state) => {
    set((current) => ({
      currentUploads: {
        ...current.currentUploads,
        [id]: state,
      },
    }));
  },
  removeUploadState: (id) => {
    set((current) => {
      const { [id]: _, ...rest } = current.currentUploads;
      return {
        currentUploads: rest,
      };
    });
  },
}));

export const useUploads = ({
  onFileUploadSuccess,
}: {
  onFileUploadSuccess: (data: { file_key: string }) => void;
}) => {
  const {
    files,
    addFile,
    removeFile,
    removeFiles,
    setUploadState,
    currentUploads,
    removeUploadState,
  } = useUploadStore();

  const { mutateAsync } = useGenerateUploadPresignedPost({
    onSuccess: (response) => {
      const file = files.find(
        (file) => file.file.name === response.original_file_name
      );
      if (file) {
        onUploadGeneratePresignedPostSuccess(
          file.file,
          (data: PresignedPostData) => {
            const currentUploadKeys = Object.keys(currentUploads);
            console.log("currentUploads", currentUploads);
            console.log("currentUploadKeys", currentUploadKeys);
            const currentLoadingUploadIndex = currentUploadKeys
              .map((key) => currentUploads[key])
              .findIndex((upload) => upload.loading && !upload.error);
            console.log("currentLoadingUploadIndex", currentLoadingUploadIndex);
            onFileUploadSuccess({
              file_key: data.fields.key,
            });

            setUploadState(currentUploadKeys[currentLoadingUploadIndex], {
              loading: false,
              error: null,
              presignedData: data,
            });
          },
          (error) => {
            const currentUploadKeys = Object.keys(currentUploads);
            const currentLoadingUploadIndex = currentUploadKeys
              .map((key) => currentUploads[key])
              .findIndex((upload) => upload.loading && !upload.error);

            setUploadState(currentUploadKeys[currentLoadingUploadIndex], {
              loading: false,
              error: {
                message: error.message,
              },
            });
          }
        )(response.presigned_post_data);
      }
    },
    onError: (error) => {
      const currentUploadKeys = Object.keys(currentUploads);
      const currentLoadingUploadIndex = currentUploadKeys
        .map((key) => currentUploads[key])
        .findIndex((upload) => upload.loading && upload.error === null);

      setUploadState(currentUploadKeys[currentLoadingUploadIndex], {
        loading: false,
        error: {
          message: error.message,
        },
      });
    },
  });

  const uploadFiles = async () => {
    const responses = await Promise.all(
      files.map(async (file) => {
        console.log("file", file);
        setUploadState(file.id, {
          loading: true,
        });
        const res = await mutateAsync({
          original_file_name: file.file.name,
          file_type: file.file.type,
          file_size: file.file.size,
        });
        console.log("res", res);
        return res.presigned_post_data.fields.key;
      })
    );

    return responses;
  };

  const clearAllUploads = () => {
    console.log("clearAllUploads");
    removeFiles();
    Object.keys(currentUploads).forEach((id) => {
      removeUploadState(id);
    });
  };

  return {
    uploadFiles,
    files,
    addFile,
    removeFile,
    removeFiles,
    currentUploads,
    clearAllUploads,
  };
};
