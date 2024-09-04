import { useEffect } from "react";
import { Link } from "react-router-dom";
import { handleRedirect, isAuthenticated } from "../../api.js";

export default function RedirectPage() {
  useEffect(() => {
    if (isAuthenticated()) {
      handleRedirect().then(() => {});
    }
  }, []);

  return <Link to="/">Thank you for authorization</Link>;
}
