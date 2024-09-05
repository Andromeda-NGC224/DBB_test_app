import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentFolder,
  selectFilesInCurrentFolder,
  selectLinks,
} from "../../redux/selectors.js";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteItem,
  fetchContent,
  fetchContentOfFolder,
  fetchItemById,
  getDownloadLink,
  uploadFile,
} from "../../redux/operations.js";
import { Loader } from "../../components/Loader/Loader.jsx";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function FoldersPageDetails() {
  const [selectedFile, setSelectedFile] = useState(null);
  const { id } = useParams();
  const folder = useSelector(selectCurrentFolder);
  const links = useSelector(selectLinks);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const listOfFiles = useSelector(selectFilesInCurrentFolder);
  console.log("Folder", folder);
  console.log("ListFiles", listOfFiles);
  console.log("Links", links);

  useEffect(() => {
    const fetchData = async () => {
      if (!folder) {
        await dispatch(fetchItemById(id));
      }
    };
    fetchData();
  }, [folder, id, dispatch]);

  useEffect(() => {
    const fetchLinkAndCont = async () => {
      if (folder) {
        await dispatch(fetchContentOfFolder(folder.path_display));
      }
    };
    fetchLinkAndCont();
  }, [folder?.path_display, dispatch]);

  const onDelete = async (path, id) => {
    try {
      await dispatch(deleteItem(path));
      await dispatch(fetchContent(""));
      console.log("Folder deleted successfully");
      console.log(`ItemId:`, id);
      toast.success("Folder was deleted!");
      navigate("/folders");
    } catch (error) {
      console.error("Error deleting folder:", error);
      toast.error("Folder was not deleted!");
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      await dispatch(
        uploadFile({ path: folder.path_display, file: selectedFile })
      );
      await dispatch(fetchContentOfFolder(folder.path_display));
      toast.success("File uploaded successfully!");
      setSelectedFile(null);
    } else {
      toast.error("Please select a file to upload.");
    }
  };

  const handleDownload = async (pathDisplay) => {
    try {
      const link = await dispatch(getDownloadLink(pathDisplay));
      console.log("Link", link.payload);
    } catch (error) {
      toast.error("Error downloading");
    }
  };

  if (!folder || folder.id !== id) {
    return <Loader />;
  }

  return (
    <>
      <h3>{folder.name}</h3>
      <p>Path: {folder.path_display}</p>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
      <button>GetLink</button>
      {listOfFiles.length === 0 ? null : (
        <ul>
          {listOfFiles.map((file, index) => (
            <li key={index}>
              {" "}
              {file.name}
              <p>{file.size} bytes</p>
              <button onClick={() => handleDownload(file.path_display)}>
                Download
              </button>
            </li>
          ))}
        </ul>
      )}
      <button onClick={() => onDelete(folder.path_display, folder.id)}>
        Delete All folder
      </button>
    </>
  );
}
