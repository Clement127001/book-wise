export const loginPages = ["/admin/login/", "/user/login/", "/user/register/"];
export const loginRestrictedPages = ["/admin/dashboard/", "/user/home/"];

export const validateToken = (token: string | undefined) => {
  return token !== undefined && token.length !== 0;
};
