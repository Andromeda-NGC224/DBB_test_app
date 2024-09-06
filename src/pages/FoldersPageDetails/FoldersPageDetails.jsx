import { useDispatch, useSelector } from "react-redux";
import {
  selectCurrentFolder,
  selectFilesInCurrentFolder,
  selectFolders,
  selectLinks,
} from "../../redux/selectors.js";
import { useNavigate, useParams } from "react-router-dom";
import {
  createFolder,
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
import FoldersList from "../../components/FoldersList/FoldersList.jsx";

export default function FoldersPageDetails() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewLink, setPreviewLink] = useState("");
  const [onShow, setOnShow] = useState(false);
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

  const onDelete = async (path) => {
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

  const onDeleteFile = async (path) => {
    try {
      await dispatch(deleteItem(path));
      await dispatch(fetchContentOfFolder(folder.path_display));
      console.log("File deleted successfully");
      toast.success("File was deleted!");
    } catch (error) {
      console.error("Error deleting File:", error);
      toast.error("File was not deleted!");
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
      const downloadLink = await dispatch(getDownloadLink(pathDisplay));
      window.location.href = downloadLink.payload;
    } catch (error) {
      toast.error("Error downloading");
    }
  };

  const handleShow = async (pathDisplay) => {
    const fileName = pathDisplay.split("/").pop();
    if (!fileName.endsWith(".jpg") && !fileName.endsWith(".png")) {
      toast.success("This file does not have a photo.", {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
      setOnShow(true);
      const defaultImage =
        "https://img.freepik.com/free-photo/file-folder-document-paper-ui-icon-sign-symbol-3d-rendering_56104-1927.jpg";

      setPreviewLink(defaultImage);
      return;
    }
    try {
      const downloadLink = await dispatch(getDownloadLink(pathDisplay));
      setOnShow(true);
      setPreviewLink(downloadLink.payload);
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
      <button onClick={() => onDelete(folder.path_display, folder.id)}>
        Delete All folder
      </button>

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
              <button onClick={() => handleShow(file.path_display)}>
                Show file
              </button>
              <button
                onClick={() => onDeleteFile(file.path_display, folder.id)}
              >
                Delete file
              </button>
            </li>
          ))}
        </ul>
      )}

      {onShow && <img src={previewLink} alt="Preview" />}
    </>
  );
}
