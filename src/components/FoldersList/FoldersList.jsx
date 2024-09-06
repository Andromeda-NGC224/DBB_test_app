import { useDispatch, useSelector } from "react-redux";
import { selectFolders } from "../../redux/selectors.js";
import { Link } from "react-router-dom";
import { fetchItemById } from "../../redux/operations.js";
import { MdFolderCopy } from "react-icons/md";
import css from "./FoldersList.module.css";

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
        <ul className={css.listCont}>
          {items.map((item) => (
            <li key={item.id}>
              <Link
                className={css.listItem}
                onClick={() =>
                  handleLoadCurrentItem(item.id, item.path_display)
                }
                to={`/folders/${item.id}`}
              >
                <MdFolderCopy size={24} />
                <p>{item.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
