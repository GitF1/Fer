import { createSlice } from "@reduxjs/toolkit";


const reviewSlice = createSlice({
    name: 'reviews',
    initialState: {
        reviews: [],
        status: null
    },
    reducers: {
        setReviews(state, action) {
            state.reviews = action.payload;
        },
        addReview(state, action) {
            state.reviews.push(action.payload);
        },
        updateReview(state, action) {
            const updatedReview = action.payload;
            state.reviews = state.reviews.map(review => review.id === updatedReview.id ? updatedReview : review);
        },
        deleteReview(state, action) {
            const delId = action.payload;
            state.reviews = state.reviews.filter(review => review.Id !== delId);
        }
    }
})

export const {setReviews, addReview, updateReview, deleteReview} = reviewSlice.actions;
export default reviewSlice.reducer;