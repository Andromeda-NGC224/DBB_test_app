import { createSlice } from "@reduxjs/toolkit";
import {
  fetchContent,
  fetchContentFoldersInFolder,
  fetchContentOfFolder,
  fetchItemById,
  createFolder,
  deleteItem,
  uploadFile,
  getDownloadLink,
} from "./operations";

const initialState = {
  token: null,
  items: [],
  currentFolder: null,
  itemsInCurrentFolder: [],
  isLoading: false,
  error: null,
};

const filesSlice = createSlice({
  name: "files",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = null;
      state.items = [];
      state.currentFolder = null;
      state.itemsInCurrentFolder = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchContent
      .addCase(fetchContent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // fetchItemById
      .addCase(fetchItemById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.currentFolder = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // fetchContentOfFolder
      .addCase(fetchContentFoldersInFolder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContentFoldersInFolder.fulfilled, (state, action) => {
        state.status = "success";
        state.itemsInCurrentFolder = action.payload;
      })
      .addCase(fetchContentFoldersInFolder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchContentOfFolder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContentOfFolder.fulfilled, (state, action) => {
        state.status = "success";
        const currentFolder = state.currentFolder;
        if (currentFolder) {
          currentFolder.files = action.payload;
        }
      })
      .addCase(fetchContentOfFolder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      // createFolder
      .addCase(createFolder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items.push(action.payload);
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // deleteItem
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // uploadFile
      .addCase(uploadFile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.isLoading = false;
        const folderIndex = state.items.findIndex(
          (item) => item.path_display === action.meta.arg.path
        );
        if (folderIndex !== -1) {
          state.items[folderIndex].files = state.items[folderIndex].files || [];
          state.items[folderIndex].files.push(action.payload);
        }
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // getDownloadLink
      .addCase(getDownloadLink.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDownloadLink.fulfilled, (state, action) => {
        state.isLoading = false;
        const currentFolder = state.currentFolder;
        if (currentFolder) {
          currentFolder.links = action.payload;
        }
      })
      .addCase(getDownloadLink.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setToken, clearToken } = filesSlice.actions;
export default filesSlice.reducer;
