import { useDispatch, useSelector } from "react-redux";
import FoldersList from "../../components/FoldersList/FoldersList.jsx";
import { createFolder } from "../../redux/operations.js";
import { useState, useEffect } from "react";

import { selectFolders } from "../../redux/selectors.js";
import { Loader } from "../../components/Loader/Loader.jsx";
import toast from "react-hot-toast";
import css from "./FoldersPage.module.css";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function FoldersPage() {
  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const dispatch = useDispatch();
  const items = useSelector(selectFolders);

  const handleShowModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setFolderName("");
  };

  const handleCreateFolder = async () => {
    if (folderName === "") {
      toast.error("Enter the name of folder, please.");
      return;
    }
    await dispatch(createFolder({ path: "", name: folderName }));
    toast.success("Folder created successfully!");
    handleCloseModal();
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

  return (
    <div className={css.foldersCont}>
      <h1 className={css.title}>Your Folders</h1>

      <div className={css.funcCont}>
        {!items ? <Loader /> : <FoldersList />}
        <div className={css.btnContainer}>
          <button className={css.btnCreate} onClick={handleShowModal}>
            Create a new folder
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
                <button
                  className={css.btnToCreate}
                  onClick={handleCreateFolder}
                >
                  Create
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
