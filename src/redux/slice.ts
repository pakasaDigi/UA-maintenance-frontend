import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define a type for the state
interface UploadState {
  loading: boolean;
  error: string | null; // Error should be either a string or null
  success: boolean;
}

// Define the initial state
const initialState: UploadState = {
  loading: false,
  error: null,
  success: false,
};

// Define a type for the error payload
type ErrorResponse = string;

// Async thunk with proper error typing
export const uploadFile = createAsyncThunk<any, FormData, { rejectValue: ErrorResponse }>(
  "upload/file",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:2020/api/parts/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    } catch (err: any) {
      if (err.response && err.response.data) {
        console.log("Error: ", err.response);
        return rejectWithValue(err.response.data as ErrorResponse);
      }
      return rejectWithValue("Something went wrong");
    }
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(uploadFile.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An unknown error occurred"; // Fallback to a default error message
      });
  },
});

export const { resetState } = uploadSlice.actions;
export default uploadSlice.reducer;
