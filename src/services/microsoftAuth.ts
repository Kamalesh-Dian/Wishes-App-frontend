import { msalInstance } from "../lib/msal";
export { msalInstance };

let initialized = false;

export const initializeMicrosoftAuth = async (): Promise<void> => {
  if (initialized) return;

  await msalInstance.initialize();

  try {
    const response = await msalInstance.handleRedirectPromise();

    if (response?.account) {
      msalInstance.setActiveAccount(response.account);
    } else {
      const accounts = msalInstance.getAllAccounts();
      if (accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0]);
      }
    }
  } catch (err: unknown) {
    const errObj = err as { errorCode?: string; message?: string };
    const isCacheError =
      errObj?.errorCode === "no_token_request_cache_error" ||
      (errObj?.message && errObj.message.includes("no_token_request_cache_error"));
    if (!isCacheError) {
      console.error("Microsoft Auth initialization redirect handler error:", err);
    }
    // fallback check
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
      msalInstance.setActiveAccount(accounts[0]);
    }
  }

  // Clear stale hash parameters if present from previous redirects to prevent future loop errors
  if (
    typeof window !== "undefined" &&
    window.location.hash &&
    (window.location.hash.includes("state=") || window.location.hash.includes("code="))
  ) {
    try {
      window.history.replaceState(
        null,
        document.title,
        window.location.pathname + window.location.search
      );
    } catch (e) {
      console.error("Failed to clear hash from URL:", e);
    }
  }

  initialized = true;
};

export const loginToOneDrive = async (): Promise<void> => {
  await initializeMicrosoftAuth();

  await msalInstance.loginRedirect({
    scopes: ["User.Read", "Files.Read", "offline_access"],
  });
};

export const getCurrentAccount = async () => {
  await initializeMicrosoftAuth();

  return msalInstance.getActiveAccount();
};

export const logoutFromOneDrive = async (): Promise<void> => {
  await initializeMicrosoftAuth();

  await msalInstance.logoutRedirect({
    postLogoutRedirectUri: import.meta.env.VITE_APP_URL || window.location.origin,
  });
};

export const getAccessToken = async (): Promise<string> => {
  await initializeMicrosoftAuth();

  const account = msalInstance.getActiveAccount();

  if (!account) {
    throw new Error("No Microsoft account connected");
  }

  const response = await msalInstance.acquireTokenSilent({
    account,
    scopes: ["User.Read", "Files.Read"],
  });

  return response.accessToken;
};
