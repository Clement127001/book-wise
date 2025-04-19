const publicRuntimeConfig =
  require("next/config").default().publicRuntimeConfig;

const { apiUrl, frontendUrl, env, projectId } = publicRuntimeConfig;

export const getApiUrl = () => {
  return apiUrl;
};

export const getEnv = () => {
  return env;
};

export const getProjectId = () => {
  return projectId;
};

export const getFrontendUrl = () => {
  return frontendUrl;
};
