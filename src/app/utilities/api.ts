import axios, { Axios, AxiosRequestConfig } from "axios";
import { getToken } from "../auth/utils";

const getUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://api.pfc.icu/api/v1";
  }
  // } else if (process.env.NODE_ENV === "test") {
  // return "https://api.staging.pfc.icu/api/v1";
  // } else {
  return "http://localhost:8000/api/v1";
  // }
};
export const getInstance = async () => {
  const token = await getToken();

  return axios.create({
    baseURL: getUrl(),
    headers: {
      "Content-Type": "*/*",
      Authorization: token ? `Bearer ${token}` : undefined,
    },
  });
};

export const post = async <RequestType, ResponseType>(
  url: string,
  data: RequestType,
  options?: AxiosRequestConfig
) => {
  const instance = await getInstance();
  const response = await instance.post<ResponseType>(url, data, { ...options });

  return response;
};

export const get = async <ResponseType>(
  url: string,
  options?: AxiosRequestConfig
) => {
  try {
    const instance = await getInstance();

    const response = await instance.get<ResponseType>(url, { ...options });

    return response;
  } catch (error) {
    console.log(error);
  }
};

export const put = async <RequestType, ResponseType>(
  url: string,
  data: RequestType,
  options: AxiosRequestConfig
) => {
  const instance = await getInstance();
  const response = await instance.put<ResponseType>(url, data, { ...options });

  return response;
};

export const patch = async <RequestType, ResponseType>(
  url: string,
  data: RequestType,
  options: AxiosRequestConfig
) => {
  const instance = await getInstance();
  const response = await instance.patch<ResponseType>(url, data, {
    ...options,
  });

  return response;
};

export const remove = async <ResponseType>(
  url: string,
  options: AxiosRequestConfig
) => {
  const instance = await getInstance();
  const response = await instance.delete<ResponseType>(url, {
    ...options,
  });

  return response;
};
