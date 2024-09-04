import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dropbox } from "dropbox";

const dropbox = new Dropbox({
  accessToken: localStorage.getItem("dropboxAccessToken"),
});

export const fetchContent = createAsyncThunk(
  "files/fetchContent",
  async (path, thunkAPI) => {
    try {
      const response = await dropbox.filesListFolder({ path });
      return response.result.entries;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchItemById = createAsyncThunk(
  "files/fetchItemById",
  async (id, thunkAPI) => {
    try {
      const response = await dropbox.filesGetMetadata({ path: id });
      return response.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createFolder = createAsyncThunk(
  "files/createFolder",
  async ({ path, name }, thunkAPI) => {
    try {
      const response = await dropbox.filesCreateFolderV2({
        path: `${path}/${name}`,
      });
      return response.result.metadata;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const uploadFile = createAsyncThunk(
  "files/uploadFile",
  async ({ path, file }, thunkAPI) => {
    try {
      const response = await dropbox.filesUpload({
        path: `${path}/${file.name}`,
        contents: file,
      });
      return response.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteItem = createAsyncThunk(
  "files/deleteItem",
  async (path, thunkAPI) => {
    try {
      const response = await dropbox.filesDeleteV2({ path });
      return response.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
