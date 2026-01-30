// features/profiles/profileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const apiUrl = import.meta.env.VITE_BACKEND_URL;

// 🔄 Fetch all profiles
export const getProfiles = createAsyncThunk(
  "profiles/getProfiles",
  async () => {
    const response = await axios.get(`${apiUrl}/api/profile`);
    return response.data;
  }
);

// 🔍 Fetch single profile by ID
export const getProfileById = createAsyncThunk(
  "profiles/getProfileById",
  async (id) => {
    const response = await axios.get(`${apiUrl}/api/profile/${id}`);
    return response.data;
  }
);

// ✏️ Update a profile
export const updateProfile = createAsyncThunk(
  "profiles/updateProfile",
  async (updatedProfile) => {
    const response = await axios.put(
      `${apiUrl}/api/profile/${updatedProfile._id}`,
      updatedProfile
    );
    return response.data;
  }
);

const profileSlice = createSlice({
  name: "profiles",
  initialState: {
    profiles: [],
    selectedProfile: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setProfiles: (state, action) => {
      state.profiles = action.payload;
    },
    clearSelectedProfile: (state) => {
      state.selectedProfile = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get all
      .addCase(getProfiles.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProfiles.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profiles = action.payload;
      })
      .addCase(getProfiles.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Get by ID
      .addCase(getProfileById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getProfileById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedProfile = action.payload;
      })
      .addCase(getProfileById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      // Update profile
      .addCase(updateProfile.fulfilled, (state, action) => {
        const index = state.profiles.findIndex(
          (p) => p._id === action.payload._id
        );
        if (index !== -1) {
          state.profiles[index] = action.payload;
        }
        if (
          state.selectedProfile &&
          state.selectedProfile._id === action.payload._id
        ) {
          state.selectedProfile = action.payload;
        }
      });
  },
});

export const { setProfiles, clearSelectedProfile } = profileSlice.actions;
export default profileSlice.reducer;
