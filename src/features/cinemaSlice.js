import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API } from "../utils/api"; // Adjust the import based on your project structure

// Thunks for async operations
export const fetchCinemas = createAsyncThunk(
  "cinemas/fetchCinemas",
  async () => {
    const response = await axios.get(API.CINEMA);
    return response.data;
  }
);

export const addCinema = createAsyncThunk(
  "cinemas/addCinema",
  async (cinema) => {
    const response = await axios.post(API.CREATE_CINEMA, cinema);
    return response.data;
  }
);

export const updateCinema = createAsyncThunk(
  "cinemas/updateCinema",
  async (cinema) => {
    const response = await axios.put(
      `${API.UPDATE_CINEMA}/${cinema.id}`,
      cinema
    );
    return response.data;
  }
);

export const deleteCinema = createAsyncThunk(
  "cinemas/deleteCinema",
  async (id) => {
    await axios.delete(`${API.CINEMA}/${id}`);
    return id;
  }
);

const cinemasSlice = createSlice({
  name: "cinema",
  initialState: {
    cinemas: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCinemas.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCinemas.fulfilled, (state, action) => {
        state.loading = false;
        state.cinemas = action.payload;
      })
      .addCase(fetchCinemas.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(addCinema.fulfilled, (state, action) => {
        state.cinemas.push(action.payload);
      })
      .addCase(updateCinema.fulfilled, (state, action) => {
        const index = state.cinemas.findIndex(
          (cinema) => cinema.id === action.payload.id
        );
        if (index !== -1) {
          state.cinemas[index] = action.payload;
        }
      })
      .addCase(deleteCinema.fulfilled, (state, action) => {
        state.cinemas = state.cinemas.filter(
          (cinema) => cinema.id !== action.payload
        );
      });
  },
});

export default cinemasSlice.reducer;
