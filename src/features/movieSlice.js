import { createSlice } from "@reduxjs/toolkit";


const initialState ={
  movies:[],
  currMovie:'1',
  status: null,    
}

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers:{
      setMovies(state,action){
          state.movies = action.payload;
      },
      addMovie(state,action){
          state.movies.push(action.payload);
      },
      setStatus(state, action){
          state.status = action.payload;
      },
      setCurrMovie(state, action){
        state.currMovie = action.payload;
    }
  }
})



// Action creators are generated for each case reducer function
export const { setMovies, addMovie, setStatus, setCurrMovie } = movieSlice.actions;

export default movieSlice.reducer;
