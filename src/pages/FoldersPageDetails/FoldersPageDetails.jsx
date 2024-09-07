import { useDispatch, useSelector } from "react-redux";
import {
  selectContentFoldersInFolder,
  selectCurrentFolder,
  selectFilesInCurrentFolder,
} from "../../redux/selectors.js";
import { Link, useParams } from "react-router-dom";
import {
  createFolder,
  deleteItem,
  fetchContent,
  fetchContentFoldersInFolder,
  fetchContentOfFolder,
  fetchItemById,
  getDownloadLink,
  uploadFile,
} from "../../redux/operations.js";
import { Loader } from "../../components/Loader/Loader.jsx";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import css from "./FoldersPageDetails.module.css";
import { FaCloudDownloadAlt, FaFileAlt, FaUpload } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { BiShowAlt } from "react-icons/bi";
import { MdFolderCopy } from "react-icons/md";
import Footer from "../../components/Footer/Footer.jsx";

export default function FoldersPageDetails() {
  const [showModal, setShowModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewLink, setPreviewLink] = useState("");
  const [onShow, setOnShow] = useState(false);
  const [folderName, setFolderName] = useState("");
  const { id } = useParams();
  const folder = useSelector(selectCurrentFolder);
  const foldersInThisFolder = useSelector(selectContentFoldersInFolder);
  const dispatch = useDispatch();
  const listOfFiles = useSelector(selectFilesInCurrentFolder);

  console.log("This Folder", folder);
  console.log("foldersInThisFolder", foldersInThisFolder);
  console.log("listOfFiles", listOfFiles);

  useEffect(() => {
    const fetchData = async () => {
      if (!folder) {
        await dispatch(fetchItemById(id));
      }
      if (folder) {
        await dispatch(fetchContentFoldersInFolder(`${folder.path_display}`));
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
      toast.success("Folder was deleted!");
      window.history.back();
    } catch (error) {
      console.error("Error deleting folder:", error);
      toast.error("Folder was not deleted!");
    }
  };

  const onDeleteFile = async (path) => {
    try {
      await dispatch(deleteItem(path));
      await dispatch(fetchContentOfFolder(folder.path_display));
      setOnShow(false);
      toast.success("File was deleted!");
    } catch (error) {
      console.error("Error deleting File:", error);
      toast.error("File was not deleted!");
    }
  };

  // const handleFileChange = (event) => {
  //   setSelectedFile(event.target.files[0]);
  // };

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

  const handleFilePick = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };
  const handleCreateFolder = async () => {
    if (folderName === "") {
      toast.error("Enter the name of folder, please.");
      return;
    }
    await dispatch(
      createFolder({ path: folder.path_display, name: folderName })
    );
    await dispatch(fetchContent(`${folder.path_display}`));
    await dispatch(fetchContentFoldersInFolder(`${folder.path_display}`));

    toast.success("Folder created successfully!");
    handleCloseModal();
  };

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setFolderName("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      handleCloseModal();
    }
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!folder || folder.id !== id) {
    return <Loader />;
  }

  return (
    <div className={css.mainCont}>
      <div className={css.foldersCont}>
        <button onClick={handleShowModal} className={css.createNewFolder}>
          Create new folder
        </button>
        {showModal && (
          <div className={css.overlay} onClick={handleOverlayClick}>
            <div className={css.modal}>
              <button onClick={handleCloseModal} className={css.closeButton}>
                <IoCloseCircleOutline size={24} />
              </button>
              <input
                className={css.input}
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Enter folder name"
              />
              <button className={css.btnToCreate} onClick={handleCreateFolder}>
                Create
              </button>
            </div>
          </div>
        )}
        <h2 className={css.title}>Folder name: {folder.name}</h2>
        <p className={css.foldersPath}>Path to folder: {folder.path_display}</p>

        <div style={{ marginBottom: "20px" }}>
          <h4 className={css.nameOfChapter}>Files</h4>
          <div className={css.funcCont}>
            {listOfFiles.length === 0 ? (
              "There are no files in this folder yet."
            ) : (
              <ul className={css.listCont}>
                {listOfFiles.map((file, index) => (
                  <li className={css.listItem} key={index}>
                    <p className={css.textContent}>
                      <strong>Name:</strong> {file.name}
                    </p>
                    <p className={css.textContent}>
                      <strong>Size:</strong> {file.size} bytes
                    </p>
                    <div className={css.containerWithBtns}>
                      <button
                        className={css.showDownlBtn}
                        onClick={() => handleDownload(file.path_display)}
                      >
                        <FaCloudDownloadAlt size={14} />
                        <p>Download</p>
                      </button>
                      <button
                        className={css.showDownlBtn}
                        onClick={() => handleShow(file.path_display)}
                      >
                        <BiShowAlt size={20} />
                        <p>Show file</p>
                      </button>
                    </div>
                    <FaFileAlt className={css.svgFile} size={18} />
                    <button
                      className={css.btnDeleteFile}
                      onClick={() => onDeleteFile(file.path_display, folder.id)}
                    >
                      <IoCloseCircleOutline size={24} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className={css.forOptionsCont}>
              <button
                className={css.btnDeleteAllFolder}
                onClick={() => onDelete(folder.path_display, folder.id)}
              >
                Delete all this folder
              </button>
              <label className={css.customFileInput} htmlFor="fileInput">
                {selectedFile ? selectedFile.name : "Choose file to upload"}
                <input
                  id="fileInput"
                  className={css.inputForSelect}
                  type="file"
                  onChange={handleFilePick}
                />
              </label>
              {selectedFile && (
                <button className={css.btnUploadFile} onClick={handleUpload}>
                  <FaUpload />
                  Upload File
                </button>
              )}
              {onShow && (
                <img
                  className={css.imgToShow}
                  src={previewLink}
                  alt="Preview"
                />
              )}
            </div>
          </div>
        </div>
        {foldersInThisFolder.length > 0 && (
          <div style={{ marginBottom: "20px" }}>
            <h4 className={css.nameOfChapter}>Folders</h4>
            <div className={css.funcCont}>
              <ul className={css.listCont}>
                {foldersInThisFolder.map((item) => (
                  <li key={item.id}>
                    <Link
                      className={css.listItemFolder}
                      onClick={() =>
                        handleLoadCurrentItem(item.id, item.path_display)
                      }
                      to={`/folders/${item.id}`}
                    >
                      <MdFolderCopy size={26} />
                      <p>{item.name}</p>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
