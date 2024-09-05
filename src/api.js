import { Dropbox } from "dropbox";
import { setToken } from "./redux/filesSlice.js";
import { useDispatch } from "react-redux";

const CLIENT_ID = "dona9fqxig1hh32";
const REDIRECT_URI = "https://dbb-test-app.vercel.app/redirect";
// const REDIRECT_URI = "http://localhost:5173/redirect";

const getAccessTokenFromUrl = () => {
  return new URLSearchParams(window.location.hash.substring(1)).get(
    "access_token"
  );
};

export const isAuthenticated = () => {
  return !!getAccessTokenFromUrl();
};

const removeTokenAfterOneHour = () => {
  setTimeout(() => {
    localStorage.removeItem("dropboxAccessToken");
  }, 3600000);
};

export const dropboxAuth = async () => {
  const dbx = new Dropbox({ clientId: CLIENT_ID });
  try {
    const authUrl = await dbx.auth.getAuthenticationUrl(REDIRECT_URI);
    window.location.href = authUrl;
    removeTokenAfterOneHour();
  } catch (error) {
    console.error("Error getting auth URL:", error);
  }
};

export const handleRedirect = async (dispatch) => {
  const accessToken = getAccessTokenFromUrl();
  if (accessToken) {
    console.log("Access Token:", accessToken);
    //   Зберіг у стор
    localStorage.setItem("dropboxAccessToken", accessToken);
    dispatch(setToken(accessToken));
    return accessToken;
  } else {
    console.error("No access token found in URL");
    return null;
  }
};
