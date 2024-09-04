import { createSlice } from "@reduxjs/toolkit";
import {
  createFolder,
  deleteItem,
  fetchContent,
  fetchItemById,
  uploadFile,
} from "./operations.js";

const filesSlice = createSlice({
  name: "files",
  initialState: {
    pathNow: "",
    items: [],
    status: "",
    error: null,
    currentFolder: null,
  },
  reducers: {
    setPathNow: (state, action) => {
      state.pathNow = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContent.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContent.fulfilled, (state, action) => {
        state.status = "succees";
        state.items = action.payload;
      })
      .addCase(fetchContent.rejected, (state, action) => {
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

export const { setPathNow } = filesSlice.actions;
export default filesSlice.reducer;
