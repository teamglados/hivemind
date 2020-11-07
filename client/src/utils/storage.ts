import decodeJWT from "jwt-decode";

export const getPersistedUser = () => {
  const token = localStorage.getItem("token");

  if (token) {
    const decoded: any = decodeJWT(token);
    const { name } = decoded.data;
    return name as string;
  }

  return null;
};
