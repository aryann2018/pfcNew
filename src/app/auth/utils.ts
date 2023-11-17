export const setToken = async (token: string) => {
  await localStorage.setItem("token", token);
};

export const getToken = async () => {
  return await localStorage.getItem("token");
};

export const removeToken = async () => {
  return await localStorage.removeItem("token");
};

export const setUserId = async (userId: string) => {
  return await localStorage.setItem("userId", userId);
};

export const getUserId = async () => {
  return await localStorage.getItem("userId");
};

export const removeUserId = async () => {
  return await localStorage.removeItem("userId");
};

export const isTokenAvailable = async () => {
  const token = await getToken();
  return token !== null;
};
