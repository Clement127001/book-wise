import { initQueryClient } from "@ts-rest/react-query";
import axios, {
  AxiosError,
  AxiosResponse,
  isAxiosError,
  AxiosRequestConfig,
  isCancel,
  CanceledError,
} from "axios";
import Cookies from "js-cookie";
import { contract } from "contract";
import { getApiUrl } from "@/utils/env";
import { centralizedLogger } from "@/utils/commonLogger";

const { createLogAxiosFn, logRenderError } = centralizedLogger();
const withLogAxios = createLogAxiosFn(axios as any);

const queryClient = (
  authToken: string | undefined,
  config?: AxiosRequestConfig<any>
) =>
  initQueryClient(contract, {
    baseUrl: getApiUrl(),
    baseHeaders: authToken ? { Authorization: `Bearer ${authToken}` } : {},
    api: async ({ path, method, headers, body }) => {
      try {
        const result = await withLogAxios({
          method: method,
          url: path,
          headers,
          data: body,
          ...config,
        });

        if (result.status === 401) {
          Cookies.remove("userToken");
          //   logout(true);
        }

        return {
          status: result.status,
          body: result.data,
          headers: result.headers as any,
        };
      } catch (e: Error | AxiosError | any) {
        if (
          isCancel(e) &&
          e instanceof CanceledError &&
          e.config?.signal instanceof AbortSignal
        ) {
          throw new Error(e.config?.signal?.reason ?? "Request Cancelled");
        }
        if (isAxiosError(e)) {
          const error = e as AxiosError;
          const response = error.response as AxiosResponse;
          return {
            status: response.status,
            body: response.data,
            headers: response.headers,
          };
        }
        throw e;
      }
    },
  });

export const getQueryClient = (config?: AxiosRequestConfig<any>) => {
  const authToken = Cookies.get("userToken");
  return queryClient(authToken, config);
};

export { logRenderError };
