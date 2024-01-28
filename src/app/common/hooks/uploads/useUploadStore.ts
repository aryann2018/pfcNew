import { useGenerateUploadPresignedPost } from "./api/hooks";
import { create } from "zustand";
import { generateRandomId } from "@/app/utilities/utils";

const onUploadGeneratePresignedPostSuccess =
  (file: { id: string; file: File }, get: any) =>
  (response: GenerateUploadPresignedPostResponse) => {
    const { url, fields } = response;
    const formData = new FormData();

    Object.entries({ ...fields, file: file.file }).forEach(([key, value]) => {
      formData.append(key, value);
    });
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error uploading file");
        }
        return res;
      })
      .then(() => {
        get().setUploadState(file.id, {
          loading: false,
          data: {
            url: url.split("?")[0],
          },
        });
      })
      .catch((error) => {
        get().setUploadState(file.id, {
          loading: false,
          error: {
            message: error.message,
          },
        });
      });
  };

interface UploadState {
  files: {
    id: string;
    file: File;
  }[];
  addFile: (file: File) => void;
  removeFile: (id: string) => void;
  uploadFiles: () => void;
  removeFiles: () => void;
  currentUploads: {
    [key: string]: UploadFileState;
  };
  setUploadState: (id: string, state: UploadFileState) => void;
  removeUploadState: (id: string) => void;
}

const useUploadStore = create<UploadState>((set, get) => ({
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
  uploadFiles: async () => {
    const { files } = get();
    files.forEach((file) => {
      get().setUploadState(file.id, {
        loading: true,
      });
      const { mutateAsync } = useGenerateUploadPresignedPost({
        onSuccess: (response) => {
          onUploadGeneratePresignedPostSuccess(file, get)(response);
        },
        onError: (error) => {
          get().setUploadState(file.id, {
            loading: false,
            error: {
              message: error.message,
            },
          });
        },
      });
      mutateAsync({
        file_name: file.file.name,
        file_type: file.file.type,
        file_size: file.file.size,
      });
    });
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
