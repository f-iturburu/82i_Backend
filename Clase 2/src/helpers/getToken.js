export const getToken = (token) => {
  return JSON.parse(localStorage.getItem("auth-token"));
};
