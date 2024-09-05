import { useEffect } from "react";
import { Link } from "react-router-dom";
import { handleRedirect, isAuthenticated } from "../../api.js";
import { useDispatch } from "react-redux";
import { fetchContent } from "../../redux/operations.js";

export default function RedirectPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    const loadContent = async () => {
      if (isAuthenticated()) {
        const accessToken = await handleRedirect(dispatch);
        if (accessToken) {
          await dispatch(fetchContent(""));
        }
      }
    };

    loadContent();
  }, [dispatch]);

  return <Link to="/">Thank you for authorization</Link>;
}
