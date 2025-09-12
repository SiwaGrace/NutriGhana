import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 1. Async thunk for saving log
export const saveLog = createAsyncThunk(
  "logs/saveLog",
  async ({ totals, loggedDishes, token }, { rejectWithValue }) => {
    try {
      const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

      const logData = {
        date,
        totals,
        foods: loggedDishes,
      };

      const res = await axios.post("http://localhost:5000/api/logs", logData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data; // this goes to fulfilled case
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// 2. Slice
const logsSlice = createSlice({
  name: "logs",
  initialState: {
    logs: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(saveLog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveLog.fulfilled, (state, action) => {
        state.loading = false;
        state.logs.push(action.payload); // add new log to state
      })
      .addCase(saveLog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default logsSlice.reducer;
