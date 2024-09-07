import { createSelector } from "reselect";

export const selectFolders = (state) => state.files.items;

export const selectContentFoldersInFolder = (state) =>
  state.files.itemsInCurrentFolder;

export const selectCurrentFolder = (state) => state.files.currentFolder;

export const selectToken = (state) => state.files.token;

export const selectStatus = (state) => state.files.status;

export const selectFilesInCurrentFolder = createSelector(
  [selectCurrentFolder],
  (currentFolder) => {
    return currentFolder ? currentFolder.files || [] : [];
  }
);
export const selectLinks = createSelector(
  [selectCurrentFolder],
  (currentFolder) => {
    return currentFolder ? currentFolder.links || [] : [];
  }
);
