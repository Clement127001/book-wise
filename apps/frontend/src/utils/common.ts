import Cookies from "js-cookie";

export const loginPages = ["/admin/login", "/user/login", "/user/register"];
export const loginRestrictedPages = ["/admin/dashboard", "/user/home"];

export const validateToken = (token: string | undefined) => {
  return token !== undefined && token.length !== 0;
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

export const validateOTP = (otp: string | null) => {
  if (otp === null) return false;
  const otpRegex = /^\d{6}$/i;
  return otpRegex.test(otp);
};

export const logout = () => {
  Cookies.remove("userToken");
};

export const getFullName = (firstname: string, lastname: string) => {
  return firstname + " " + lastname;
};

export function get(obj: any, path: any, defaultValue?: any) {
  const pathArray = Array.isArray(path) ? path : path.split(".");

  const result = pathArray.reduce((acc, key) => acc && acc[key], obj);

  return result === undefined ? defaultValue : result;
}

export const getErrorMessage = (error: {
  status: number;
  body: unknown;
}): string => {
  const isErrorResponse = (object: unknown): object is any => {
    return typeof object === "object" && object !== null && "message" in object;
  };
  if (error.status === 404 && isErrorResponse(error.body)) {
    return error.body.message ?? "Not found";
  }

  if (isErrorResponse(error.body)) {
    return error.body.message ?? "An error occurred";
  }
  return "An error occurred";
};
