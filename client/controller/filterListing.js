import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    listings: {},
}

const filterListingSlice = createSlice({
    name: 'filterListing',
    initialState,
    reducers: {
        setfilterListing: (state, action) => {
            state.listings = action.payload
        },
    }
})

export const { setfilterListing } = filterListingSlice.actions;
export const filterListingSliceReducer = filterListingSlice.reducer;
