import { Dropbox } from "dropbox";

const CLIENT_ID = "dona9fqxig1hh32";
const REDIRECT_URI = "http://localhost:5173/redirect";
// const REDIRECT_URI = "http://localhost:5173/redirect";

const getAccessTokenFromUrl = () => {
  return new URLSearchParams(window.location.hash.substring(1)).get(
    "access_token"
  );
};

export const isAuthenticated = () => {
  return !!getAccessTokenFromUrl();
};

export const dropboxAuth = async () => {
  const dbx = new Dropbox({ clientId: CLIENT_ID });
  try {
    const authUrl = await dbx.auth.getAuthenticationUrl(REDIRECT_URI);
    window.location.href = authUrl;
  } catch (error) {
    console.error("Error getting auth URL:", error);
  }
};

export const handleRedirect = async () => {
  const accessToken = getAccessTokenFromUrl();
  if (accessToken) {
    console.log("Access Token:", accessToken);
    //   Зберіг у стор
    localStorage.setItem("dropboxAccessToken", accessToken); //
    return accessToken;
  } else {
    console.error("No access token found in URL");
    return null;
  }
};
