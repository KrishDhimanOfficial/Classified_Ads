import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    seller: {},
    rating: 0,
    wishListVisible: false
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
        },
        setWishListVisible: (state, action) => {
            state.wishListVisible = action.payload
        }
    }
})

export const { setProfile, setRating, setWishListVisible } = sellerSlice.actions;
export const sellerSliceReducer = sellerSlice.reducer;
