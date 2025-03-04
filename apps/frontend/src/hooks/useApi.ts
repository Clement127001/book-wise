import { useState } from "react";
import { ZodError } from "zod";
import { usePageLoader } from "@/context/pageLoaderProvider";
import { toast } from "sonner";
import { ErrorStatusInterface, MakeApiCallFunctionProps } from "@/types/common";

export function useApi() {
  const { showPageLoader, hidePageLoader } = usePageLoader();
  const [isLoading, setIsLoading] = useState(false);

  //TODO:   need to change it without using logger and axios
  const makeApiCall = async function <
    T extends { status: number; body?: any }
  >({
    fetcherFn,
    onSuccessFn,
    onFailureFn,
    successMsgProps,
    failureMsgProps,
    showLoader = true,
    showFailureMsg = true,
    finallyFn,
  }: MakeApiCallFunctionProps<T>) {
    if (showLoader) {
      showPageLoader();
      setIsLoading(true);
    }
    try {
      const response = await fetcherFn();
      if (response.status >= 200 && response.status <= 299) {
        hidePageLoader();
        setIsLoading(false);
        if (successMsgProps) {
          const { title, description, duration } = successMsgProps;
          toast.success(title, {
            description,
            duration,
            cancel: {
              label: "cancel",
              onClick: () => {},
            },
          });
        }
        if (onSuccessFn) {
          onSuccessFn(response);
        }
      } else if (response.status === 401) {
        // logout(true);
      } else {
        if (
          response &&
          response.body &&
          response.body.message &&
          showFailureMsg
        ) {
          toast.error(failureMsgProps?.title ?? "Error", {
            duration: 5000,
            description: response.body.message,
            cancel: {
              label: "cancel",
              onClick: () => {},
            },
          });
        } else {
          if (!showFailureMsg) {
            return;
          }
          const myError = new ZodError(response.body.issues);
          const obj = myError.flatten().fieldErrors;

          let outputString = "";
          for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
              outputString += `${key} is ${(obj?.[key] ?? []).join(
                ", "
              )}. <br/>`;
            }
          }
          outputString = outputString.trim();
        }
        hidePageLoader();
        setIsLoading(false);
      }
    } catch (error) {
      hidePageLoader();
      setIsLoading(false);
      const errorResponse = error as ErrorStatusInterface;
      if (onFailureFn) {
        onFailureFn(error);
      }
      if (!showFailureMsg) {
        return;
      }
      toast.error(failureMsgProps?.title ?? "Error", {
        duration: 5000,
        description: errorResponse.message,
        cancel: {
          label: "cancel",
          onClick: () => {},
        },
        ...failureMsgProps,
      });
    } finally {
      finallyFn && finallyFn();
    }
  };

  return { makeApiCall, isApiLoading: isLoading };
}
