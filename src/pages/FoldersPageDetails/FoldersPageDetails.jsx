import { useDispatch, useSelector } from "react-redux";
import { selectCurrentFolder } from "../../redux/selectors.js";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { deleteItem, fetchItemById } from "../../redux/operations.js";
import { Loader } from "../../components/Loader/Loader.jsx";
import toast from "react-hot-toast";

export default function FoldersPageDetails() {
  const { id } = useParams();
  const folder = useSelector(selectCurrentFolder);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(folder);

  useEffect(() => {
    dispatch(fetchItemById(id));
  }, [dispatch, id]);

  const onDelete = async (path, id) => {
    try {
      await dispatch(deleteItem(path));
      console.log("Folder deleted successfully");
      console.log(`ItemId:`, id);
      toast.success("Folder was deleted!");
      navigate("/folders");
    } catch (error) {
      console.error("Error deleting folder:", error);
      toast.error("Folder was not deleted!");
    }
  };

  if (!folder) {
    return <Loader />;
  }

  return (
    <>
      <h3>{folder.name}</h3>
      <p>Path: {folder.path_display}</p>
      <button onClick={() => onDelete(folder.path_display, folder.id)}>
        Delete All folder
      </button>
    </>
  );
}
