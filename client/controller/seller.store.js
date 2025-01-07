import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    seller: {},
}

const sellerSlice = createSlice({
    name: 'seller',
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.seller = action.payload
        }
    }
})

export const { setProfile } = sellerSlice.actions;
export const sellerSliceReducer = sellerSlice.reducer;
