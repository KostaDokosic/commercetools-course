import fetch from "node-fetch";
import { ClientBuilder } from "@commercetools/sdk-client-v2";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
import { readConfig } from "../utils/config";

const devConfig = readConfig("DEV");
export const devProjectKey = devConfig.projectKey;
const authMiddlewareOptions = {
  host: devConfig.oauthHost,
  projectKey: devConfig.projectKey,
  credentials: {
    clientId: devConfig.clientId,
    clientSecret: devConfig.clientSecret,
  },
  scopes: devConfig.scopes,
  fetch,
};

const httpMiddlewareOptions = {
  host: devConfig.host,
  fetch,
};

const client = new ClientBuilder()
  .withProjectKey(devConfig.projectKey)
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

export const getApiRoot = () => {
  return createApiBuilderFromCtpClient(client).withProjectKey({
    projectKey: devConfig.projectKey,
  });
};
