import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "../features/movieSlice";
import reviewReducer from "../features/reviewSlice";
import cinemaReducer from "../features/cinemaSlice";

export const store = configureStore({
  reducer: {
    movies: movieReducer,
    reviews: reviewReducer,
    cinema: cinemaReducer,
  },
});
