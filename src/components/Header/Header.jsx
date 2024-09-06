import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../../redux/filesSlice.js";
import { selectToken } from "../../redux/selectors.js";
import css from "./Header.module.css";
import clsx from "clsx";

export default function Header() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const logout = () => {
    localStorage.removeItem("dropboxAccessToken");
    dispatch(clearToken());
  };

  const NavLinkStyle = ({ isActive }) => {
    return clsx(css.link, isActive && css.active);
  };

  return (
    <>
      <header className={css.header}>
        <Link to="/" className={css.logo}>
          <span className={css.logoPartFOLDER}>Folder</span>
          <span className={css.logoPartAPP}>App</span>
        </Link>

        {token && (
          <nav className={css.nav}>
            <ul className={css.list}>
              <li>
                <NavLink to="/" className={NavLinkStyle}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/folders" className={NavLinkStyle}>
                  Folders
                </NavLink>
              </li>
              <li>
                <NavLink className={css.link} to="/" onClick={() => logout()}>
                  Logout
                </NavLink>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
