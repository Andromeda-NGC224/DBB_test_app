import { useDispatch, useSelector } from "react-redux";
import FoldersList from "../../components/FoldersList/FoldersList.jsx";
import { createFolder, fetchContent } from "../../redux/operations.js";
import { useEffect, useState } from "react";
import { selectFolders } from "../../redux/selectors.js";

export default function FoldersPage() {
  const items = useSelector(selectFolders);
  const [folderName, setFolderName] = useState("");
  const dispatch = useDispatch();

  const handleCreateFolder = () => {
    dispatch(createFolder({ path: "", name: folderName }));
  };

  useEffect(() => {
    dispatch(fetchContent(""));
  }, [dispatch]);

  console.log(items);

  return (
    <>
      <h1>FoldersPage</h1>
      <FoldersList />
      <button onClick={() => handleCreateFolder({})}>Create Folder</button>
      <input
        type="text"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        placeholder="Enter folder name"
      />
    </>
  );
}
