import {
  PublicClientApplication,
  type Configuration,
  BrowserCacheLocation,
} from "@azure/msal-browser";

export const msalConfig: Configuration = {
  auth: {
    clientId: import.meta.env.VITE_MS_CLIENT_ID || "",
    authority: `https://login.microsoftonline.com/${
      import.meta.env.VITE_MS_TENANT_ID || "common"
    }`,
    redirectUri:
      import.meta.env.VITE_APP_URL ||
      (typeof window !== "undefined" ? window.location.origin : ""),
  },
  cache: {
    cacheLocation: BrowserCacheLocation.SessionStorage,
    storeAuthStateInCookie: true,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);
