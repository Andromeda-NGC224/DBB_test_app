import { useEffect } from "react";
import { dropboxAuth } from "../../api.js";
import { useDispatch } from "react-redux";
import { fetchContent } from "../../redux/operations.js";
import FoldersList from "../../components/FoldersList/FoldersList.jsx";
import { Link } from "react-router-dom";

export default function HomePage() {
  const token = localStorage.getItem("dropboxAccessToken");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContent(""));
  }, [dispatch]);

  return (
    <>
      <h1>Hello World</h1>
      {!token && <button onClick={dropboxAuth}>Auth</button>}
      {token && <Link to="/folders"> To FOLDERS page</Link>}
    </>
  );
}
