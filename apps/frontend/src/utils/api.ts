import { initQueryClient } from "@ts-rest/react-query";
import { contract } from "contract";
import Cookies from "js-cookie";
import { tsRestFetchApi } from "@ts-rest/core";
import { getApiUrl } from "@/utils/env";

const queryClient = (authToken: string | undefined) =>
  initQueryClient(contract, {
    baseUrl: getApiUrl(),
    baseHeaders: authToken ? { Authorization: `Bearer ${authToken}` } : {},
    api: async (args) => {
      const response = await tsRestFetchApi(args);

      if (response.status === 401) {
        Cookies.remove("userToken");
      }
      return response;
    },
  });

export const getQueryClient = () => {
  const authToken = Cookies.get("userToken");
  return queryClient(authToken);
};
