import axios from "axios";
// import { secureStore } from './secureStore';

const getUrl = () => {
  if (process.env.NODE_ENV === "production") {
    return "https://api.pfc.icu/api/v1";
  } else if (process.env.NODE_ENV === "development") {
    return "https://api.staging.pfc.icu/api/v1";
  }
};

export const instance = axios.create({
  baseURL: getUrl(),
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${secureStore.getItem('token')}`
  },
});

export const post = async <RequestType, ResponseType>(
  url: string,
  data: RequestType
) => {
  try {
    const response = await instance.post<ResponseType>(url, data);

    return response;
  } catch (error) {
    console.log(error);
  }

  // const response = await instance.post<ResponseType>(url, data);Z
};

export const get = async <ResponseType>(url: string) => {
  const response = await instance.get<ResponseType>(url);

  return response;
};

export const put = async <RequestType, ResponseType>(
  url: string,
  data: RequestType
) => {
  const response = await instance.put<ResponseType>(url, data);
  return response;
};

export const patch = async <RequestType, ResponseType>(
  url: string,
  data: RequestType
) => {
  const response = await instance.patch<ResponseType>(url, data);
  return response;
};

export const remove = async <ResponseType>(url: string) => {
  const response = await instance.delete<ResponseType>(url);
  return response;
};
