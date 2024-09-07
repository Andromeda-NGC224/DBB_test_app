import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dropbox } from "dropbox";

export const fetchContent = createAsyncThunk(
  "files/fetchContent",
  async (path, thunkAPI) => {
    const token = localStorage.getItem("dropboxAccessToken");
    const dropbox = new Dropbox({ accessToken: token });
    try {
      const response = await dropbox.filesListFolder({ path });
      return response.result.entries;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchContentFoldersInFolder = createAsyncThunk(
  "files/fetchContentFoldersInFolder",
  async (path, thunkAPI) => {
    const token = localStorage.getItem("dropboxAccessToken");
    const dropbox = new Dropbox({ accessToken: token });
    try {
      const response = await dropbox.filesListFolder({ path });
      const folders = response.result.entries.filter(
        (entry) => entry[".tag"] === "folder"
      );
      return folders;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchContentOfFolder = createAsyncThunk(
  "files/fetchContentOfFolder",
  async (path, thunkAPI) => {
    const token = localStorage.getItem("dropboxAccessToken");
    const dropbox = new Dropbox({ accessToken: token });
    try {
      const response = await dropbox.filesListFolder({ path });
      const files = response.result.entries.filter(
        (entry) => entry[".tag"] === "file"
      );
      return files;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchItemById = createAsyncThunk(
  "files/fetchItemById",
  async (id, thunkAPI) => {
    const token = localStorage.getItem("dropboxAccessToken");
    const dropbox = new Dropbox({ accessToken: token });
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
    const token = localStorage.getItem("dropboxAccessToken");
    const dropbox = new Dropbox({ accessToken: token });
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
    const token = localStorage.getItem("dropboxAccessToken");
    const dropbox = new Dropbox({ accessToken: token });
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
    const token = localStorage.getItem("dropboxAccessToken");
    const dropbox = new Dropbox({ accessToken: token });
    try {
      const response = await dropbox.filesDeleteV2({ path });
      return response.result;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getDownloadLink = createAsyncThunk(
  "files/getDownloadLink",
  async (path, thunkAPI) => {
    const token = localStorage.getItem("dropboxAccessToken");
    const dropbox = new Dropbox({ accessToken: token });
    try {
      const response = await dropbox.filesGetTemporaryLink({ path });
      return response.result.link;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
