import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectStatus, selectToken } from "../../redux/selectors.js";
import { Loader } from "../Loader/Loader.jsx";
import { dropboxAuth } from "../../api.js";
import css from "./Hero.module.css";

export const Hero = () => {
  const token = useSelector(selectToken);
  const status = useSelector(selectStatus);
  if (status === "loading") {
    return <Loader />;
  }

  return (
    <div className={css.hero}>
      <div className={css.overlay}></div>
      <h1 className={css.title}>File manager of your dreams</h1>
      <h2 className={css.subtitle}>
        You can save everything you want in our FileApp.
      </h2>
      {!token && (
        <button className={css.btnAuth} onClick={dropboxAuth}>
          Authenticate to start
        </button>
      )}
      {token && (
        <Link className={css.btnAuth} to="/folders">
          Go to your folders
        </Link>
      )}
    </div>
  );
};
