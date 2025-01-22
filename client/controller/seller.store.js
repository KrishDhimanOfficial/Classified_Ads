import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    seller: {},
    rating: 0
}

const sellerSlice = createSlice({
    name: 'seller',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.seller = action.payload
        },
        setRating: (state, action) => {
            state.rating = action.payload
        }
    }
})

export const { setProfile, setRating } = sellerSlice.actions;
export const sellerSliceReducer = sellerSlice.reducer;
