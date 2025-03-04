import { createLogger } from "@cybermindworks/frontend-logger";
import { getProjectId } from "@/utils/env";

export const centralizedLogger = () => {
  return createLogger({
    projectId: getProjectId(),
    disableLogs: true,
  });
};
