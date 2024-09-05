import { useDispatch, useSelector } from "react-redux";
import { selectCurrentFolder, selectFolders } from "../../redux/selectors.js";
import { Link } from "react-router-dom";
import {
  fetchContentOfFolder,
  fetchItemById,
  getDownloadLink,
} from "../../redux/operations.js";

export default function FoldersList() {
  const items = useSelector(selectFolders);

  const dispatch = useDispatch();

  const handleLoadCurrentItem = async (id, path) => {
    try {
      await dispatch(fetchItemById(id));
      await dispatch(fetchContentOfFolder(path));
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
