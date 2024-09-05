import { useSelector } from "react-redux";
import { dropboxAuth } from "../../api.js";

import { Link } from "react-router-dom";
import { selectStatus, selectToken } from "../../redux/selectors.js";
import { Loader } from "../../components/Loader/Loader.jsx";

export default function HomePage() {
  const token = useSelector(selectToken);
  const status = useSelector(selectStatus);

  if (status === "loading") {
    return <Loader />;
  }

  return (
    <>
      <h1>Hello World</h1>
      {!token && <button onClick={dropboxAuth}>Auth</button>}
      {token && <Link to="/folders"> To FOLDERS page</Link>}
    </>
  );
}
