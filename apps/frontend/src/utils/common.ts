export const loginPages = ["/admin/login/", "/user/login/", "/user/register/"];
export const loginRestrictedPages = ["/admin/dashboard/", "/user/home/"];

export const validateToken = (token: string | undefined) => {
  return token !== undefined && token.length !== 0;
};

export const validateEmail = (email: string) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return emailRegex.test(email);
};

export const validateLoginOTP = (otp: string | null) => {
  if (otp === null) return false;
  const otpRegex = /^\d{6}$/i;
  return otpRegex.test(otp);
};
