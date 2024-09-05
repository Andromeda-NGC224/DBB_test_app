import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearToken } from "../../redux/filesSlice.js";
import { selectToken } from "../../redux/selectors.js";

export default function Header() {
  const dispatch = useDispatch();
  const token = useSelector(selectToken);

  const logout = () => {
    localStorage.removeItem("dropboxAccessToken");
    dispatch(clearToken());
  };

  return (
    <>
      <div></div>
      {token && (
        <Link to="/" onClick={() => logout()}>
          LogOut
        </Link>
      )}
    </>
  );
}
