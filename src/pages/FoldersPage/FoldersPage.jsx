import { useDispatch, useSelector } from "react-redux";
import FoldersList from "../../components/FoldersList/FoldersList.jsx";
import {
  createFolder,
  fetchContentOfFolder,
  fetchItemById,
} from "../../redux/operations.js";
import { useEffect, useState } from "react";

import { MdFolderCopy } from "react-icons/md";
import { selectFolders } from "../../redux/selectors.js";
import { Loader } from "../../components/Loader/Loader.jsx";
import toast from "react-hot-toast";

export default function FoldersPage() {
  const [folderName, setFolderName] = useState("");
  const dispatch = useDispatch();
  const items = useSelector(selectFolders);

  const handleCreateFolder = async () => {
    if (folderName === "") {
      toast.error("Enter the name of folder, please.");
      return;
    }
    await dispatch(createFolder({ path: "", name: folderName }));
    toast.success("Folder created successfully!");
    setFolderName("");
  };

  return (
    <>
      <h1>FoldersPage</h1>
      {!items ? <Loader /> : <FoldersList />}
      <MdFolderCopy />
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
