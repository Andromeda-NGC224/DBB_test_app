import { useDispatch, useSelector } from "react-redux";
import { selectFolders } from "../../redux/selectors.js";

import { deleteItem } from "../../redux/operations.js";
import { Link } from "react-router-dom";

export default function FoldersList() {
  const items = useSelector(selectFolders);
  const dispatch = useDispatch();

  return (
    <>
      {items && (
        <ul>
          LIST
          {items.map((item) => (
            <li key={item.id}>
              <Link to={`/folders/${item.id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
