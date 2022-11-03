export const enum Prefix {
  DEV = "DEV",
  IMPORT = "IMPORT",
  STORE = "STORE",
  ME = "ME",
  AWS = "AWS",
}

export const readConfig = (prefix: string) => {
  return {
    clientId: process.env["REACT_APP_" + prefix + "_CLIENT_ID"] || "",
    clientSecret: process.env["REACT_APP_" + prefix + "_CLIENT_SECRET"] || "",
    projectKey: process.env["REACT_APP_" + prefix + "_PROJECT_KEY"] || "",
    oauthHost: process.env["REACT_APP_" + prefix + "_AUTH_URL"] || "",
    host: process.env["REACT_APP_" + prefix + "_API_URL"] || "",
    username: process.env["REACT_APP_" + prefix + "_CUSTOMER_EMAIL"] || "",
    password: process.env["REACT_APP_" + prefix + "_CUSTOMER_PASSWORD"] || "",
    scopes: process.env["REACT_APP_" + prefix + "_SCOPES"]?.split(" ") || [""],
  };
};

export type Config = {
  clientId: string;
  clientSecret: string;
  projectKey: string;
  oauthHost: string;
  host: string;
  username?: string;
  password?: string;
  scopes: string[];
};
