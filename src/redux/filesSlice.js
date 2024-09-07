import { createSlice } from "@reduxjs/toolkit";
import {
  createFolder,
  deleteItem,
  fetchContent,
  fetchContentFoldersInFolder,
  fetchContentOfFolder,
  fetchItemById,
  getDownloadLink,
  uploadFile,
} from "./operations.js";

const filesSlice = createSlice({
  name: "files",
  initialState: {
    pathNow: "",
    items: [],
    itemsInCurrentFolder: [],
    status: "",
    error: null,
    currentFolder: null,
    token: localStorage.getItem("dropboxAccessToken") || "",
    downloadLinks: [],
  },
  reducers: {
    setPathNow: (state, action) => {
      state.pathNow = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    clearToken: (state) => {
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(fetchContent.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
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
      .addCase(fetchItemById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchItemById.fulfilled, (state, action) => {
        state.status = "success";
        state.currentFolder = action.payload;
      })
      .addCase(fetchItemById.rejected, (state, action) => {
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
      .addCase(getDownloadLink.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDownloadLink.fulfilled, (state, action) => {
        state.status = "success";
        const currentFolder = state.currentFolder;
        if (currentFolder) {
          currentFolder.links = action.payload;
        }
      })
      .addCase(getDownloadLink.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createFolder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createFolder.fulfilled, (state, action) => {
        state.status = "success";
        state.items.push(action.payload);
      })
      .addCase(createFolder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(uploadFile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.status = "success";
        const folderIndex = state.items.findIndex(
          (item) => item.path_display === action.meta.arg.path
        );
        if (folderIndex !== -1) {
          state.items[folderIndex].files = state.items[folderIndex].files || [];
          state.items[folderIndex].files.push(action.payload);
        }
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteItem.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.status = "success";
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setPathNow, setToken, clearToken } = filesSlice.actions;
export default filesSlice.reducer;
