// features/profiles/profileSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 🔄 Async thunk to update a profile on backend
export const updateProfile = createAsyncThunk(
  "profiles/updateProfile",
  async (updatedProfile, thunkAPI) => {
    const response = await axios.put(
      `http://localhost:5000//api/profile${updatedProfile.id}`,
      updatedProfile
    );

    return response.data;
  }
);

const profileSlice = createSlice({
  name: "profiles",
  initialState: {
    profiles: [],
    status: "idle",
    error: null,
  },
  reducers: {
    setProfiles: (state, action) => {
      state.profiles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      const index = state.profiles.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.profiles[index] = action.payload;
      }
    });
  },
});

export const { setProfiles } = profileSlice.actions;
export default profileSlice.reducer;
