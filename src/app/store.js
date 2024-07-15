import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/movieSlice";
import reviewReducer from "../features/reviewSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    reviews: reviewReducer,
  },
});
