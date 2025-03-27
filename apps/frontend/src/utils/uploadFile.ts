import { UploadMediaResponseType } from "@/types/common";
import { getApiUrl } from "@/utils/env";

export const uploadFile = async (
  file: File,
  url: string
): Promise<string | { errorTitle: string; errorMessage: string }> => {
  const formData = new FormData();
  formData.append("file", file);

  const apiUrl = getApiUrl();

  try {
    const response = await fetch(`${apiUrl}${url}`, {
      method: "POST",
      body: formData,
    });
    const fileResponse: UploadMediaResponseType = await response.json();
    return fileResponse.data.url;
  } catch (err) {
    return {
      errorTitle: "Error Occurred!",
      errorMessage: "Couldn't upload the file. Please upload it again.",
    };
  }
};
