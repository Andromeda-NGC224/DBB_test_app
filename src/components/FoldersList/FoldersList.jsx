import { useDispatch, useSelector } from "react-redux";
import { selectCurrentFolder, selectFolders } from "../../redux/selectors.js";
import { Link, useParams } from "react-router-dom";
import {
  fetchContent,
  fetchContentOfFolder,
  fetchItemById,
  getDownloadLink,
} from "../../redux/operations.js";
import { useEffect } from "react";

export default function FoldersList() {
  const items = useSelector(selectFolders);

  const dispatch = useDispatch();

  const handleLoadCurrentItem = async (id) => {
    try {
      await dispatch(fetchItemById(id));
    } catch (error) {
      console.error("Error loading folder content:", error);
    }
  };

  return (
    <>
      {items && (
        <ul>
          LIST
          {items.map((item) => (
            <li key={item.id}>
              <Link
                onClick={() =>
                  handleLoadCurrentItem(item.id, item.path_display)
                }
                to={`/folders/${item.id}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
